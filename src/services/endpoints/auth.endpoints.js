import { cryptoWalletApi } from "../api";

const authEndPoint = cryptoWalletApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: "/auth/register/",
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: "/auth/token/obtain/",

        method: "POST",
        body: data,
      }),
    }),
    tokenVerify: build.query({
      query: () => ({
        url: "/auth/token/verify/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useTokenVerifyQuery } =
  authEndPoint;
