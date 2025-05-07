import { createSlice } from "@reduxjs/toolkit";

export const categoryIdSlice = createSlice({
  name: "categoryId",
  initialState: {
    categoryId: "",
  },
  reducers: {
    categoryIdFun: (state, action) => {
      state.categoryId = action.payload;
    },

  },
});
export const { categoryIdFun } = categoryIdSlice.actions;
export default categoryIdSlice.reducer;
