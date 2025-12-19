import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "---",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {
    handleChangeEnq: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
      //   console.log({ year: state.harvest_year });
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    // handleDateHarv: (state, { payload }) => {
    //   const { name, date } = payload;
    //   state[name] = date;
    //   //   console.log({ purchase_date: state.purchase_date });
    // },
    setUpdateEnq: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const { handleChangeEnq, resetValues, changePage, setUpdateEnq } =
  enquirySlice.actions;
export default enquirySlice.reducer;
