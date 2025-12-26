import { createSlice } from "@reduxjs/toolkit";
const searchQueryParams = {
  gendersearch: "---",
  isVerified: "---",
  blacklisted: "---",
  subscribed: "---",
  sort: "A-Z",
  pages: 1,
};
const initialState = {
  email: "",
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  gender: "",
  notification: true,
  ...searchQueryParams,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    handelChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    populate: (state, { payload }) => {
      const { email, password } = payload;
      // console.log(payload)
      return {
        ...state,
        email,
        password,
      };
    },
    handlePhoneInput: (state, { payload }) => {
      //   console.log({ phone: state.phone });
      return {
        ...state,
        phone: payload,
      };
    },
    changePage: (state, { payload }) => {
      state.pages = payload;
    },
    resetValues: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { handelChange, handlePhoneInput, changePage, resetValues, populate } = userSlice.actions;
export default userSlice.reducer;
