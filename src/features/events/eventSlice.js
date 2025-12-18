import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "",
  event_url: "",
  description: "",
  status: "upcoming",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    handelChangeEvent: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    // handlePhoneInputNok: (state, { payload }) => {
    //   return {
    //     ...state,
    //     phone: payload,
    //   };
    // },

    handleDateEvent: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateEvent: (state, { payload }) => {
      //console.log(payload);
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
  handelChangeEvent,
  //handlePhoneInputNok,
  handleDateEvent,
  handleReset,
  setUpdateEvent,
  resetValues,
  changePage,
} = eventSlice.actions;
export default eventSlice.reducer;
