import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import authMgmtSlice from "./slices/auth/auth";
import rootReducer from "./rootReducers";

// ✅ Create persist configs
const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};

const servicePersistConfig = {
  key: "services",
  storage,
  blacklist: ["authMgmtSlice"],
};

// ✅ Persist reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authMgmtSlice);
const persistedServicesReducer = persistReducer(servicePersistConfig, rootReducer);

// ✅ Combine everything into one root
const combinedReducer = combineReducers({
  authMgmtSlice: persistedAuthReducer,
  services: persistedServicesReducer,
});

// ✅ Create store
const store = configureStore({
  reducer: combinedReducer,
  devTools: {
    name: "HaritPane Farmer Store",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
