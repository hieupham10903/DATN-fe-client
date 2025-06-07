import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  listOrder: [],
  updateSuccess: false,
  mainImage: null as string | null,
};

const apiListAllOrderItems = "/api/list-all-order-item";
const apiUpdateQuantity = "/api/update-quantity";

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
      });
  },
});

export const { resetState } = orderReducer.actions;

export default orderReducer.reducer;
