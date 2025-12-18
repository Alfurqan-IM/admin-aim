import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "",
  description: "",
  donation_url: "",
  start_date: "",
  end_date: "",
  status: "---",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    handelChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    handleDateCamp: (state, { payload }) => {
      const { name, date } = payload;
      //console.log({ name, date });
      state[name] = date;
    },
    setUpdateCampaign: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const { handelChange, resetValues, changePage, handleDateCamp, setUpdateCampaign } =
  campaignSlice.actions;
export default campaignSlice.reducer;
