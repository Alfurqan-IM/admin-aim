import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  verse: 0,
  surah: "",
  text: "",
  translation: "",
  transliteration: "",
  isEdit: false,
  pages: 1,
};
const quranSlice = createSlice({
  name: "quran",
  initialState,
  reducers: {
    handleChangeQuran: (state, { payload }) => {
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
      // console.log(state.pages)
    },
    // handleDateHunter: (state, { payload }) => {
    //   const { name, date } = payload;
    //   state[name] = date;
    // },
    setUpdateQuran: (state, { payload }) => {
      console.log(state.isEdit);
      return { ...state, ...payload, isEdit: true };
    },
    // handlePhoneInput: (state, { payload }) => {
    //   return {
    //     ...state,
    //     phone: payload,
    //   };
    // },
    // handleEmerInput: (state, { payload }) => {
    //   return {
    //     ...state,
    //     emergency_contact: payload,
    //   };
    // },
  },
});

export const {
  handleChangeQuran,
  resetValues,
  changePage,
  //handleDateHunter,
  setUpdateQuran,
  // handlePhoneInput,
  // handleEmerInput,
} = quranSlice.actions;
export default quranSlice.reducer;
