import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoWalletApi } from "../services/api";
import { userInfoSlice } from "../features/userSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    [cryptoWalletApi.reducerPath]: cryptoWalletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoWalletApi.middleware),
});

setupListeners(store.dispatch);
