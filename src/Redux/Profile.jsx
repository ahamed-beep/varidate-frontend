import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../Connection/Api";

// Action to submit profile
export const submitProfile = createAsyncThunk(
  "profile/submitProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Profile Slice with state management
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    success: false,
    profile: null,
  },
  reducers: {
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.profile = null;
    },
    setFormData: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload.profile;
      })
      .addCase(submitProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfileState, setFormData } = profileSlice.actions;
export default profileSlice.reducer;
