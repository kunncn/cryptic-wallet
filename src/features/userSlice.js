import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  date_of_birth: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setDateOfBirth } = userInfoSlice.actions;

export default userInfoSlice.reducer;
