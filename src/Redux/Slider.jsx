import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../Connection/Api";

// Thunk to upload slider image
export const sliderimage = createAsyncThunk(
  "sliderimage",
  async (slider) => {
    const response = await axiosinstance.post("/slider", slider);
    console.log(response.data);
    return response.data;
  }
);

// Thunk to fetch all slider images
export const getallimages = createAsyncThunk(
  "getallimages",
  async () => {
    const response = await axiosinstance.get("/getallimages");
    console.log("API response:", response.data);
    return response.data.getimages; // Ensure this matches the API response key
  }
);

const sliderslice = createSlice({
  name: "sliderslice",
  initialState: {
    loading: false,
    error: null,
    slider: [], // Array to store slider images
  },
  reducers: {},
  extraReducers: (builder) => {
    // Cases for sliderimage thunk
    builder
      .addCase(sliderimage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sliderimage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.slider = action.payload; // Update slider state with the uploaded image
      })
      .addCase(sliderimage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });

    // Cases for getallimages thunk
    builder
      .addCase(getallimages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallimages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.slider = action.payload; // Update slider state with fetched images
      })
      .addCase(getallimages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

export default sliderslice.reducer;