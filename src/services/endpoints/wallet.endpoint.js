import { cryptoWalletApi } from "../api";

const walletEndPoint = cryptoWalletApi.injectEndpoints({
  endpoints: (build) => ({
    createWallet: build.mutation({
      query: () => ({
        url: "/trc-20/wallet/",
        method: "POST",
      }),
    }),
    walletDetail: build.query({
      query: () => ({
        url: "/trc-20/wallet/details/",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateWalletMutation, useWalletDetailQuery } = walletEndPoint;
