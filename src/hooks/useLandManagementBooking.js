import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBooking,
  cancelBooking,
  getBookingStatus,
} from "../reduxtoolkit/slices/service category/bookingSlice";

export const useLandManagementBooking = ({ vendor, filters }) => {
  const dispatch = useDispatch();

  const { isBooking, loading } = useSelector((state) => state.services.bookingSlice);

  const [bookingId, setBookingId] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    const fetchBookingStatus = async () => {
      if (!vendor?.providerId || !vendor?._id || !vendor?.categoryId || !vendor?.Info?._id) return;
      try {
        const res = await dispatch(
          getBookingStatus({
            bookingFor: "land_management",
            providerId: vendor.providerId,
            serviceId: vendor._id,
            categoryId: vendor.categoryId,
            tractorInfoId: vendor.Info?._id,
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
    if (!vendor?.providerId || !vendor?._id || !vendor?.categoryId || !vendor?.Info?._id)
      return false;

    const payload = {
      bookingFor: "land_management",
      serviceId: vendor._id,
      providerId: vendor.providerId,
      categoryId: vendor.categoryId,
      tractorInfoId: vendor.Info?._id,
      amount: vendor.payableAmount?.toString(),
      hpOfTractor: filters.hpOfTractor,
      bookingFromDate: filters.fromDate,
      bookingTillDate: filters.toDate,
      bookingStartTime: filters.fromTime,
      extraCharges: vendor.extraCharges,
      distanceBeyondRadius: vendor.distanceBeyondRadius,
      modelOfTractor: vendor.Info.modelOfTractor,
      price: vendor.Info.price,
      farmArea: filters?.farmArea,
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
      await dispatch(
        cancelBooking({ bookingId, status: "cancelled", reasonForRejection: reason }),
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
