import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cookie: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCookie: (state, action) => {
      state.cookie = action.payload;
    },
  },
});

export const { setUser, setCookie } = userSlice.actions;
export default userSlice.reducer;
