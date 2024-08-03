import { cryptoWalletApi } from "../api";

const profileEndPoint = cryptoWalletApi.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/profile/update/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProfileMutation } = profileEndPoint;
