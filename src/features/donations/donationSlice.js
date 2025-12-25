import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isEdit: false,
  page: 1,
  limit:5,
  per_page: 1,
  date_from: "",
  date_to: "",
  email: 1,
  campaign_name: "",
  donor_id: "",
  id: "",
  first_name: "",
  last_name: "",
  campaign_id: "",
  amount_min: "",
  amount_max: "",
};
const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    handleChangeDonation: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateDonation: (state, { payload }) => {
      const { name, date } = payload;
      //console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateDonation: (state, { payload }) => {
      return { ...state, ...payload, isEdit: true };
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    // updatePriceRangeProvision: (state, { payload }) => {
    //   return {
    //     ...state,
    //     priceRangeSP: payload,
    //   };
    // },
  },
});

export const {
  handleChangeDonation,
  handleDateDonation,
  handleReset,
  setUpdateDonation,
  resetValues,
  changePage,
  //updatePriceRangeProvision,
} = donationSlice.actions;
export default donationSlice.reducer;
