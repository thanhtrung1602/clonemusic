import { ITrack } from "@/types/track";
import { createSlice } from "@reduxjs/toolkit";

interface AudioState {
  isPlay: boolean;
  currentTime: number;
  duration: number;
  currentTrack: ITrack | undefined;
  slugProduct: string;
  hiddenOnPlaylist: boolean;
  trackId: number;
  isRepeat: boolean;
  currentTrackId: number;
  idTrackIsPlay: number;
  hiddenOnEdit: boolean;
}

const initialState: AudioState = {
  isPlay: false,
  currentTime: 0,
  duration: 0,
  currentTrack: undefined,
  slugProduct: "",
  hiddenOnPlaylist: false,
  trackId: 0,
  isRepeat: false,
  currentTrackId: 0,
  idTrackIsPlay: 0,
  hiddenOnEdit: false,
};

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setPlaying(state, action) {
      state.isPlay = true;
      state.idTrackIsPlay = action.payload;
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
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload;
    },
    setCurrentTrackId(state, action) {
      state.currentTrackId = action.payload.id;
    },
    setSlugProduct: (state, action) => {
      state.slugProduct = action.payload;
    },
    setTogglePlaylist: (state) => {
      state.hiddenOnPlaylist = !state.hiddenOnPlaylist;
    },

    setTrackId: (state, action) => {
      state.trackId = action.payload;
    },

    setIsRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    setHiddenOnEdit: (state) => {
      state.hiddenOnEdit = true;
    },
  },
});

export const {
  setPlaying,
  setCurrentTime,
  setDuration,
  setPause,
  setSlugProduct,
  setTogglePlaylist,
  setTrackId,
  setCurrentTrack,
  setIsRepeat,
  setCurrentTrackId,
  setHiddenOnEdit,
} = actionsSlice.actions;
export default actionsSlice.reducer;
