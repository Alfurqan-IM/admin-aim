import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pages: 1,
  sort: "---",
};
const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {
    // handleChangeService: (state, { payload }) => {
    //   const { name, value } = payload;
    //   state[name] = value;
    // },

    // handleDateService: (state, { payload }) => {
    //   const { name, date } = payload;
    //   console.log({ name, date });
    //   state[name] = date;
    // },
    handleReset: (state) => {
      return { ...initialState };
    },
    // setUpdateService: (state, { payload }) => {
    //   return { ...state, ...payload, isEdit: true };
    // },
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

export const {
  // handleChangeService,
  // handleDateService,
  handleReset,
  //setUpdateService,
  resetValues,
  changePage,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
