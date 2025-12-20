import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  programme: "",
  category: "---",
  discovery_method: "---",
  isEdit: false,
  pages: 1,
  sort: "---",
};
const registerationSlice = createSlice({
  name: "registerations",
  initialState,
  reducers: {
    handleChangeReg: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    // handleDateHive: (state, { payload }) => {
    //   const { name, date } = payload;
    //   console.log({ name, date });
    //   state[name] = date;
    // },
    handleReset: (state) => {
      return { ...initialState };
    },
    setUpdateReg: (state, { payload }) => {
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

export const { handleChangeReg, handleReset, setUpdateReg, resetValues, changePage } =
  registerationSlice.actions;
export default registerationSlice.reducer;
