import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth/auth";
import profileMgmtSlice from "./slices/account settings/profile";

const rootReducer = combineReducers({
  authMgmtSlice,
  profileMgmtSlice,
});
export default rootReducer;
