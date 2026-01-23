import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth/auth";
import profileMgmtSlice from "./slices/account settings/profile";
import bookingListSlice from "./slices/progress/bookingList";
import jobOrderListSlice from "./slices/progress/jobOrder";
import LandServiceMgmtSlice from "./slices/service category/landManagementServices";
import HarvestorServiceMgmtSlice from "./slices/service category/harvestorServices";
import CattleServiceMgmtSlice from "./slices/service category/cattlePurchaseServices";
import ExcavationServiceMgmtSlice from "./slices/service category/excavationServices";
import ElectrostaticSprayingServiceMgmtSlice from "./slices/service category/electrostaticSprayingServices";
import LabourServiceMgmtSlice from "./slices/service category/labourServices";
import TransportationServiceMgmtSlice from "./slices/service category/transportationService";
import BorewellServiceMgmtSlice from "./slices/service category/borewellServices";
import CowDunkServiceMgmtSlice from "./slices/service category/cowDunkServices";
import CompoundWallServiceMgmtSlice from "./slices/service category/compoundWallServices";
import DroneServiceMgmtSlice from "./slices/service category/droneServices";
import AugerServiceMgmtSlice from "./slices/service category/augerServices";
import bookingSlice from "./slices/service category/bookingSlice";
import CarouselAdsMgmtSlice from "./slices/dashboard/carouselAds";
import ClassifiedSectionMgmtSlice from "./slices/dashboard/classifiedSection";
import StaticContentMgmtSlice from "./slices/static content/staticContent";
import reviewSlice from "./slices/rate and reviews/rateReview";
import chatSlice from "./slices/chats/chats";

const rootReducer = combineReducers({
  authMgmtSlice,
  profileMgmtSlice,
  bookingListSlice,
  jobOrderListSlice,
  LandServiceMgmtSlice,
  HarvestorServiceMgmtSlice,
  CattleServiceMgmtSlice,
  ExcavationServiceMgmtSlice,
  ElectrostaticSprayingServiceMgmtSlice,
  LabourServiceMgmtSlice,
  TransportationServiceMgmtSlice,
  BorewellServiceMgmtSlice,
  CowDunkServiceMgmtSlice,
  CompoundWallServiceMgmtSlice,
  DroneServiceMgmtSlice,
  AugerServiceMgmtSlice,
  bookingSlice,
  CarouselAdsMgmtSlice,
  ClassifiedSectionMgmtSlice,
  StaticContentMgmtSlice,
  reviewSlice,
  chatSlice,
});
export default rootReducer;
