import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBooking,
  cancelBooking,
  getBookingStatus,
} from "../reduxtoolkit/slices/service category/bookingSlice";

export const useHarvestorBooking = ({ vendor, filters }) => {
  const dispatch = useDispatch();

  const { isBooking, loading } = useSelector((state) => state.services.bookingSlice);

  const [bookingId, setBookingId] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    if (!vendor?.providerId || !vendor?._id || !vendor?.categoryId || !filters?.typeOfCrop) return;

    const fetchBookingStatus = async () => {
      try {
        const res = await dispatch(
          getBookingStatus({
            bookingFor: "harvester",
            typeOfCrop: filters.typeOfCrop,
            providerId: vendor.providerId,
            serviceId: vendor._id,
            categoryId: vendor.categoryId,
          }),
        ).unwrap();
        setBookingId(res?.data?.bookingId || null);
        setBookingStatus(res?.data?.status || "");
      } catch {
        toast.error("Failed to fetch booking status");
      }
    };
    fetchBookingStatus();
  }, [vendor, dispatch]);

  const bookService = async () => {
    if (!vendor?.providerId || !vendor?._id || !vendor?.categoryId || !filters?.typeOfCrop)
      return false;

    const payload = {
      bookingFor: "harvester",
      serviceId: vendor._id,
      providerId: vendor.providerId,
      categoryId: vendor.categoryId,
      typeOfCrop: filters.typeOfCrop,
      bookingFromDate: filters.fromDate,
      bookingTillDate: filters.toDate,
      bookingStartTime: filters.fromTime,
      amount: vendor.payableAmount?.toString(),
      extraCharges: vendor.extraCharges,
      distanceBeyondRadius: vendor.distanceBeyondRadius,
      price: vendor.priceInfo[0].price,
      cropType: vendor.priceInfo[0].cropType,
      priceInfoId: vendor.priceInfo[0]._id,
      areaUnderCultivation: filters.areaUnderCultivation,
      addressOfFarm: filters?.address,
      location: {
        type: "Point",
        coordinates: [Number(filters?.lng), Number(filters?.lat)],
      },
    };
    try {
      const res = await dispatch(createBooking(payload)).unwrap();
      setBookingId(res?.data?._id || null);
      setBookingStatus(res?.data?.status || "");
      // toast.success(res?.message || "Booking request sent");
      return true;
    } catch (err) {
      toast.error(err?.message || "Failed to create booking");
      return false;
    }
  };

  const cancelServiceBooking = async (reason) => {
    if (!bookingId) {
      toast.error("Booking not found");
      return;
    }
    try {
      const res = await dispatch(
        cancelBooking({
          bookingId,
          status: "cancelled",
          reasonForRejection: reason,
        }),
      ).unwrap();
      toast.success("Booking cancelled successfully");
      setBookingId(null);
    } catch (err) {
      toast.error(err?.message || "Failed to cancel booking");
    }
  };

  return {
    isBooking,
    loading,
    bookingId,
    bookingStatus,
    bookService,
    cancelServiceBooking,
  };
};
