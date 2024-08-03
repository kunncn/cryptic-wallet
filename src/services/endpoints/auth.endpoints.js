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
      providesTags: ["Profile"],
    }),
    requestOtp: build.mutation({
      query: (data) => ({
        url: "/auth/request-otp/",
        method: "POST",
        body: data,
      }),
    }),
    requestPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useTokenVerifyQuery,
  useRequestOtpMutation,
  useRequestPasswordMutation,
} = authEndPoint;
