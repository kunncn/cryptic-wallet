import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoWalletApi } from "../services/api";

export const store = configureStore({
  reducer: {
    [cryptoWalletApi.reducerPath]: cryptoWalletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoWalletApi.middleware),
});

setupListeners(store.dispatch);
