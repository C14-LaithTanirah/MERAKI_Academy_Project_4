import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import categoryIdReducer from "./slices/categoryIdSlice";

export default configureStore({
  reducer: {
    tokenReducer: tokenReducer,
    categoryIdReducer: categoryIdReducer,
  },
});
