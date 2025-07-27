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

export const fetchPublicProfiles = createAsyncThunk(
  "profile/fetchPublicProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("/profile");
      console.log(response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getProfileById = createAsyncThunk(
  "profile/getById",
  async (id, { rejectWithValue }) => {
    try {
 const responce =    await axiosinstance.get(`/profiledetail/${id}`);

      console.log(responce.data)
      return responce.data.profile; // full profile object
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to fetch profile";
      return rejectWithValue(errMsg);
    }
  }
);


// In your Redux/profile.js


// Redux/profile.js

export const fetchProfileById = createAsyncThunk(
  "profile/fetchProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/profiledetail/${id}`);
      return response.data.profile;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const fetchProfilePicture = createAsyncThunk(
  "profile/fetchPicture",
  async (userId, { rejectWithValue }) => {
    try {
 const response = await axiosinstance.get(`/user/${userId}/picture`);
 console.log(response.data)
      return response.data; // Should return { pictureUrl, visibility }
    } catch (error) {
      if (error.response?.status === 403) {
        return rejectWithValue("Profile picture is hidden");
      }
      if (error.response?.status === 404) {
        return rejectWithValue("Profile not found");
      }
      return rejectWithValue(error.response?.data?.message || "Failed to fetch picture");
    }
  }
);
export const updateBadgeScores = createAsyncThunk(
  'profile/updateBadgeScores',
  async ({ id, votes }, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.patch(
        `/update-badge-score/${id}`,
        votes
      );
      
      if (response.data.success) {
        return response.data.data;
      }
      return rejectWithValue(response.data.error || 'Update failed');
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        details: error.response?.data?.details
      });
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
    picture: null,
    pictureLoading: false,
    pictureError: null,
  selectedProfile: null,
  profile: null,
   currentProfile: null,
  publicProfiles: [], // Initialize as empty array
  publicProfilesLoading: false,
  publicProfilesError: null,
   badgeScore: 0,       
  badgeLevel: '',  
   updatedProfile: null,
  validationErrors: [],    
  successMessage: '',  
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
    // Submit Profile
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
    })

    // Fetch Public Profiles
    .addCase(fetchPublicProfiles.pending, (state) => {
      state.publicProfilesLoading = true;
      state.publicProfilesError = null;
    })
    .addCase(fetchPublicProfiles.fulfilled, (state, action) => {
      state.publicProfilesLoading = false;
      state.publicProfiles = action.payload.profiles;
    })
    .addCase(fetchPublicProfiles.rejected, (state, action) => {
      state.publicProfilesLoading = false;
      state.publicProfilesError = action.payload;
    })

    // Fetch Profile by ID (used in detail page)
    .addCase(fetchProfileById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProfileById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProfile = action.payload;
      state.selectedProfile = action.payload; // ✅ optional: add if you use selectedProfile in UI
        console.log("✅ Redux stored selectedProfile:", action.payload); // ✅
    })
    .addCase(fetchProfileById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch profile";
    })

    // Get Profile by ID (used in validator page)
    .addCase(getProfileById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getProfileById.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase(getProfileById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
     .addCase(updateBadgeScores.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateBadgeScores.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedProfile = action.payload.updated;
        state.validationErrors = action.payload.validationErrors || [];
      })
      .addCase(updateBadgeScores.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(fetchProfilePicture.pending, (state) => {
        state.pictureLoading = true;
        state.pictureError = null;
      })
      .addCase(fetchProfilePicture.fulfilled, (state, action) => {
        state.pictureLoading = false;
        state.picture = action.payload; // { pictureUrl, visibility }
      })
      .addCase(fetchProfilePicture.rejected, (state, action) => {
        state.pictureLoading = false;
        state.pictureError = action.payload;
      });




}

});

export const { resetProfileState, setFormData } = profileSlice.actions;
export default profileSlice.reducer;
