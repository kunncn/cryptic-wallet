import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoWalletApi = createApi({
  reducerPath: "cryptoWalletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
