import { createSlice } from "@reduxjs/toolkit";

export const actionsSlice = createSlice({
  name: "actions",
  initialState: {
    isPlay: false,
    currentTime: 0,
    duration: 0,
  },
  reducers: {
    setPlaying(state) {
      state.isPlay = true;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setPause(state) {
      state.isPlay = false;
    },
  },
});

export const { setPlaying, setCurrentTime, setDuration, setPause } =
  actionsSlice.actions;
export default actionsSlice.reducer;
