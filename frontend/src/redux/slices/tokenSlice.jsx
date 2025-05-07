import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    tokenFun: (state, action) => {
      console.log(action.payload);
      
      state.permissions = action.payload;
    },

  },
});
export const { tokenFun } = tokenSlice.actions;
export default tokenSlice.reducer;
