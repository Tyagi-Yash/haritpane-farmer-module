import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createBooking,
  cancelBooking,
  getBookingStatus,
} from "../reduxtoolkit/slices/service category/bookingSlice";

export const useBorewellBooking = ({ vendor, filters }) => {
  const dispatch = useDispatch();

  const { isBooking, loading } = useSelector((state) => state.services.bookingSlice);

  const [bookingId, setBookingId] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    if (!vendor?.providerId || !vendor?._id || !vendor?.categoryId) return;

    const fetchBookingStatus = async () => {
      try {
        const res = await dispatch(
          getBookingStatus({
            bookingFor: "borewell",
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
    if (!vendor?.providerId || !vendor?._id || !vendor?.categoryId) return false;

    const payload = {
      bookingFor: "borewell",
      serviceId: vendor._id,
      providerId: vendor.providerId,
      categoryId: vendor.categoryId,
      amount: vendor.payableAmount?.toString(),
      depthOfBorewell: filters.depthOfBorewell,
      casingPipe: filters.casingPipe,
      waterMotor: filters.waterMotor,
      bookingFromDate: filters.fromDate,
      bookingTillDate: filters.toDate,
      bookingStartTime: filters.fromTime,
      bookingEndTime: filters.toTime,
      extraCharges: vendor.extraCharges,
      distanceBeyondRadius: vendor.distanceBeyondRadius,
      motorPower: vendor?.motorInfo?.[0]?.motorPower,
      motorCost: vendor?.motorInfo?.[0]?.motorCost,
      boreDigging: vendor.borewellInfo.boreDigging,
      pipeCharges: vendor.borewellInfo.pipeCharges,
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
