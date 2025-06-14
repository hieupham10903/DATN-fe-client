import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../main/login/reducers.ts";
import orderReducer from "../main/order/reducers.ts";
import paymentReducer from "../main/payment/reducers.ts";
import productReducer from "../main/product/reducers.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
