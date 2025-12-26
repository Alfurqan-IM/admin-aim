import { createSlice } from "@reduxjs/toolkit";
const outcomes = { outcome1: "", outcome2: "", outcome3: "" };
const initialState = {
  isEdit: false,
  pages: 1,
  sort: "---",
  title: "",
  description: "",
  heading: "",
  about: "",
  time: "",
  year: 2025,
  start_date: "",
  end_date: "",
  ...outcomes,
};

const programmeSlice = createSlice({
  name: "programmes",
  initialState,
  reducers: {
    handleChangeProgramme: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    handleDateProgramme: (state, { payload }) => {
      const { name, date } = payload;
      console.log({ name, date });
      state[name] = date;
    },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateProgramme: (state, { payload }) => {
      const { available } = payload;
      return {
        ...state,
        ...payload,
        isEdit: true,
        available: available ? "available" : "not available",
      };
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
  handleChangeProgramme,
  handleDateProgramme,
  handleReset,
  setUpdateProgramme,
  resetValues,
  changePage,
} = programmeSlice.actions;
export default programmeSlice.reducer;
