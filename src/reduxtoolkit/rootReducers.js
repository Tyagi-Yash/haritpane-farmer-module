import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth/auth";
import profileMgmtSlice from "./slices/account settings/profile";
import LandServiceMgmtSlice from "./slices/service category/landManagementServices";
import HarvestorServiceMgmtSlice from "./slices/service category/harvestorServices";
import CattleServiceMgmtSlice from "./slices/service category/cattlePurchaseServices";
import ExcavationServiceMgmtSlice from "./slices/service category/excavationServices";
import ElectrostaticSprayingServiceMgmtSlice from "./slices/service category/electrostaticSprayingServices";
import LabourServiceMgmtSlice from "./slices/service category/labourServices";
import BorewellServiceMgmtSlice from "./slices/service category/borewellServices";
import DroneServiceMgmtSlice from "./slices/service category/droneServices";
import AugerServiceMgmtSlice from "./slices/service category/augerServices";
import CarouselAdsMgmtSlice from "./slices/dashboard/carouselAds";
import ClassifiedSectionMgmtSlice from "./slices/dashboard/classifiedSection";

const rootReducer = combineReducers({
  authMgmtSlice,
  profileMgmtSlice,
  LandServiceMgmtSlice,
  HarvestorServiceMgmtSlice,
  CattleServiceMgmtSlice,
  ExcavationServiceMgmtSlice,
  ElectrostaticSprayingServiceMgmtSlice,
  LabourServiceMgmtSlice,
  BorewellServiceMgmtSlice,
  DroneServiceMgmtSlice,
  AugerServiceMgmtSlice,
  CarouselAdsMgmtSlice,
  ClassifiedSectionMgmtSlice,
});
export default rootReducer;
