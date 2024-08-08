import { cryptoWalletApi } from "../api";

const transactionEndPoint = cryptoWalletApi.injectEndpoints({
  endpoints: (build) => ({
    postTransaction: build.mutation({
      query: (data) => ({
        url: "/trc-20/transaction/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),
    getTransactionHistory: build.query({
      query: () => ({
        url: "/trc-20/transaction/history/",
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
  }),
  overrideExisting: false,
});

export const { usePostTransactionMutation, useGetTransactionHistoryQuery } =
  transactionEndPoint;
