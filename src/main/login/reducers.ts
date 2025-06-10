import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../common/axiosClient.ts";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  registerSuccess: false,
  userInfo: undefined as any,
  updateSuccess: false,
};

const apiUpdateEmployee = "/api/update-employee";

export const login = createAsyncThunk("user/login", async (body: any) => {
  localStorage.setItem("isAuthenticated", "true");
  const response = await axiosClient.post<any>("/api/auth/login-client", body);
  return response.data;
});

export const register = createAsyncThunk("user/register", async (body: any) => {
  const response = await axiosClient.post<any>("/api/auth/register", body);
  return response.data;
});

export const chatBot = createAsyncThunk("user/chat_bot", async (body: any) => {
  const response = await axiosClient.post<any>("/api/chatbot", body);
  return response.data;
});

export const getUserInfo = createAsyncThunk(
  "user/userInfo",
  async (body: any) => {
    localStorage.setItem("isAuthenticated", "true");
    const response = await axiosClient.post<any>("/api/auth/user-info", body);
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "user/updateEmployee",
  async (body: any) => {
    const response = await axiosClient.post<any>(apiUpdateEmployee, body);
    return response;
  }
);

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
      state.userInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(login.pending, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerSuccess = true;
      })
      .addCase(register.pending, (state, action) => {
        state.registerSuccess = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerSuccess = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.userInfo = undefined;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.userInfo = undefined;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.updateSuccess = true;
      })
      .addCase(updateEmployee.pending, (state, action) => {
        state.updateSuccess = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.updateSuccess = false;
      });
  },
});

export const { setAuth, logout } = userReducer.actions;
export default userReducer.reducer;
