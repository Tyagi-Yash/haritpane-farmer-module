import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth/auth";
import profileMgmtSlice from "./slices/account settings/profile";
import LandServiceMgmtSlice from "./slices/service category/landManagementServices";
import HarvestorServiceMgmtSlice from "./slices/service category/harvestorServices";
import CattleServiceMgmtSlice from "./slices/service category/cattlePurchaseServices";

const rootReducer = combineReducers({
  authMgmtSlice,
  profileMgmtSlice,
  LandServiceMgmtSlice,
  HarvestorServiceMgmtSlice,
  CattleServiceMgmtSlice,
});
export default rootReducer;
