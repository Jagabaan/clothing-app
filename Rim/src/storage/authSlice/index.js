import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// REGISTER
export const rimUserRegister = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

//LogOut
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",{},
       
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

//checAuth
export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Auth check failed");
    }
  }
);

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(rimUserRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rimUserRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(rimUserRegister.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
  console.log("Login fulfilled with payload:", action.payload);
  state.isLoading = false;

  if (action.payload?.success && action.payload?.user) {
    state.user = action.payload.user;
    state.isAuthenticated = true;
  } else {
    state.user = null;
    state.isAuthenticated = false;
  }
})
.addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
       //checkAuth
  .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
    state.isLoading = false;

  if (action.payload?.success && action.payload?.user) {
    state.user = action.payload.user;
    state.isAuthenticated = true;
  } else {
    state.user = null;
    state.isAuthenticated = false;
  }
   })
  .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }) .addCase(logoutUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.user = null;
    state.isAuthenticated = false
   })
      ;
  },
  });

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
