import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBalance: (state, { payload }) => {
      state.balance = payload;
    },
    // decrement: (state) => {
    //   state.balance -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.balance += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setBalance } = userSlice.actions;

export default userSlice.reducer;
