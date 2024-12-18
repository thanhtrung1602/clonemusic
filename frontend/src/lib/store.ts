import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "./features/actionsSlice";
import userReducer from "./features/userSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      action: actionReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
