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
  }),
  overrideExisting: false,
});

export const { usePostTransactionMutation } = transactionEndPoint;
