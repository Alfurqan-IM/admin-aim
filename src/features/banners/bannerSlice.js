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
  handleDate,
  handleReset,
  setUpdateBanner,
  resetValues,
  changePage,
} = bannerSlice.actions;
export default bannerSlice.reducer;
