import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../features/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
});
