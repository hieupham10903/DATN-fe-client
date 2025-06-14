import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  listOrder: [],
  updateSuccess: false,
  mainImage: null as string | null,
  order: undefined as any,
};

const apiListAllOrderItems = "/api/list-all-order-item";
const apiUpdateQuantity = "/api/update-quantity";
const apiDeleteOrder = "/api/delete-order-item";
const apiDetailOrder = "/api/get-detail-order";

export const getListOrder = createAsyncThunk(
  "order/getListOrder",
  async (userId: string) => {
    const requestUrl = `${apiListAllOrderItems}/${userId}`;
    const response = await axiosClient.get<any>(requestUrl);
    return response;
  }
);

export const getImage = createAsyncThunk(
  "order/getImage",
  async (imagePath: string) => {
    const response = await axiosClient.get(
      `/api/get-image?imagePath=${imagePath}`,
      {
        responseType: "blob",
      }
    );

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(response.data);
    });
  }
);

export const updateQuantity = createAsyncThunk(
  "order/updateQuantity",
  async (body: any) => {
    await axiosClient.post<any>(apiUpdateQuantity, body);
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: string) => {
    await axiosClient.post<any>(`${apiDeleteOrder}/${id}`);
  }
);

export const getDetailOrder = createAsyncThunk(
  "order/getDetailOrder",
  async (orderId: string) => {
    const requestUrl = `${apiDetailOrder}/${orderId}`;
    const response = await axiosClient.post<any>(requestUrl);
    return response;
  }
);

const orderReducer = createSlice({
  name: "orderReducer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.mainImage = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOrder.fulfilled, (state, action) => {
        state.listOrder = action.payload.data;
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.mainImage = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.updateSuccess = true;
      })
      .addCase(updateQuantity.pending, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.updateSuccess = true;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(getDetailOrder.fulfilled, (state, action) => {
        state.order = action.payload.data;
      });
  },
});

export const { resetState } = orderReducer.actions;

export default orderReducer.reducer;
