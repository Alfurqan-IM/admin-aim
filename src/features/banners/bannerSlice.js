import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "",
  description: "",
  time: "",
  year: "",
  start_date:"",
  end_date:"",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    handelChangeBan: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    // handlePhoneInputEmp: (state, { payload }) => {
    //   return {
    //     ...state,
    //     phone: payload,
    //   };
    // },

    handleDate: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateBanner: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
    // updateSalaryRange: (state, { payload }) => {
    //   return {
    //     ...state,
    //     salaryRange: payload,
    //   };
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
  handelChangeBan,
  //handlePhoneInputEmp,
  handleDate,
  handleReset,
  setUpdateBanner,
 // updateSalaryRange,
  resetValues,
  changePage,
} = bannerSlice.actions;
export default bannerSlice.reducer;
