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
    setUpdateEnq: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const { handleChangeEnq, resetValues, changePage, setUpdateEnq } =
  enquirySlice.actions;
export default enquirySlice.reducer;
