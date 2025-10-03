import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth/auth";
import profileMgmtSlice from "./slices/account settings/profile";
import LandServiceMgmtSlice from "./slices/service category/landManagementServices";
import HarvestorServiceMgmtSlice from "./slices/service category/harvestorServices";
import CattleServiceMgmtSlice from "./slices/service category/cattlePurchaseServices";
import BorewellServiceMgmtSlice from "./slices/service category/borewellServices";
import LabourServiceMgmtSlice from "./slices/service category/labourServices";

const rootReducer = combineReducers({
  authMgmtSlice,
  profileMgmtSlice,
  LandServiceMgmtSlice,
  HarvestorServiceMgmtSlice,
  CattleServiceMgmtSlice,
  BorewellServiceMgmtSlice,
  LabourServiceMgmtSlice,
});
export default rootReducer;
