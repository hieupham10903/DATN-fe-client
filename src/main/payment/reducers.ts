import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  updateSuccess: false,
  urlVnPay: null as any,
  listOrderItemsLastest: [] as any,
};

const apiCreatePayment = "/api/payment/submitOrder";
const apiPaymentSuccess = "/api/payment/payment-sucess";
const apiListOrderItemsLastest = "/api/max-order-time-list";
const apiCreatePaymentOffline = "/api/payment/submitOrder-offline";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiCreatePayment, body);
    return response;
  }
);

export const createPaymentOffine = createAsyncThunk(
  "payment/createPaymentOffine",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiCreatePaymentOffline, body);
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

export const getListOrderItemsLastest = createAsyncThunk(
  "payment/getListOrderItemsLastest",
  async (orderId: string) => {
    const response = await axiosClient.get<any>(
      `${apiListOrderItemsLastest}/${orderId}`
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
    builder
      .addCase(createPayment.fulfilled, (state, action) => {
        state.urlVnPay = action.payload.data;
      })
      .addCase(getListOrderItemsLastest.fulfilled, (state, action) => {
        state.listOrderItemsLastest = action.payload.data;
      });
  },
});

export const { resetState } = paymentReducer.actions;

export default paymentReducer.reducer;
