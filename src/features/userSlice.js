import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  date_of_birth: "",
  address: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserName: (state, { payload }) => {
      state.username = payload;
    },
    setDateOfBirth: (state, { payload }) => {
      state.date_of_birth = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setDateOfBirth, setAddress } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
