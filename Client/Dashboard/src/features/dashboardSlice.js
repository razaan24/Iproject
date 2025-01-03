import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../Api/BaseUrl";

const initialState = {
  dashboard: [],
  loading: false,
  error: "",
};

export const dashboardSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.dashboard = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.dashboard = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.dashboard = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } =
  dashboardSlice.actions;

export const fetchAsync = (search, filter) => async (dispatch) => {
  try {
    dispatch(fetchPending());

    let url = `${BaseUrl}/dashboards?search=${search}`;
    if (filter) {
      url += `&filter=${filter}`;
    }
    const { data } = await axios.get(`${url}`, {
      headers: { Authorization: `Bearer ${localStorage.access_token}` },
    });
    console.log(data);

    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchReject(error.message));
  }
};

export default dashboardSlice.reducer;
