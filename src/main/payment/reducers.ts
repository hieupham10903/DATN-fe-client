import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  updateSuccess: false,
  urlVnPay: null as any,
};

const apiCreatePayment = "/api/payment";
const apiPaymentSuccess = "/api/payment/payment-sucess";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiCreatePayment, body);
    return response;
  }
);

export const paymentSuccess = createAsyncThunk(
  "payment/paymentSuccess",
  async (orderId: string) => {
    const response = await axiosClient.post<any>(
      `${apiPaymentSuccess}/${orderId}`
    );
    return response;
  }
);

const paymentReducer = createSlice({
  name: "paymentReducer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPayment.fulfilled, (state, action) => {
      state.urlVnPay = action.payload.data;
    });
  },
});

export const { resetState } = paymentReducer.actions;

export default paymentReducer.reducer;
