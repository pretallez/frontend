import { configureStore } from "@reduxjs/toolkit";
import sheetReducer from "./slices/sheet-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sheet: sheetReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
