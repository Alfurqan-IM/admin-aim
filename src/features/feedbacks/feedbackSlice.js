import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pages: 1,
  sort: "---",
};
const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {
    handleReset: (state) => {
      return { ...initialState };
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
  },
});

export const { handleReset, resetValues, changePage } = feedbackSlice.actions;
export default feedbackSlice.reducer;
