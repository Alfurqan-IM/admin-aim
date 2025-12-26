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
    setUpdateQuran: (state, { payload }) => {
      console.log(state.isEdit);
      return { ...state, ...payload, isEdit: true };
    },
  },
});

export const {
  handleChangeQuran,
  resetValues,
  changePage,
  setUpdateQuran,
} = quranSlice.actions;
export default quranSlice.reducer;
