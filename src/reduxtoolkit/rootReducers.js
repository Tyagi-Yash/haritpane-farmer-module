import { combineReducers } from "@reduxjs/toolkit";
import authMgmtSlice from "./slices/auth/auth";

const rootReducer = combineReducers({
  authMgmtSlice,
});
export default rootReducer;
