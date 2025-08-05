import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../Connection/Api";

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

// Updated fetchPublicProfiles to only show validatable profiles
export const fetchPublicProfiles = createAsyncThunk(
  "profile/fetchPublicProfiles",
  async (loggedInUserId, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get('/profile', {
        params: {
          loggedInUserId: loggedInUserId // This will now filter by company matching
        }
      });
      
      console.log('Fetched validatable profiles:', response.data.profiles);
      console.log('User ID:', loggedInUserId);
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Check if user can validate a specific profile
export const checkCanValidate = createAsyncThunk(
  "profile/checkCanValidate",
  async ({ profileId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/can-validate/${profileId}`, {
        params: { userId }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get users who share companies with current user
export const fetchSharedCompanyUsers = createAsyncThunk(
  "profile/fetchSharedUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/shared-companies/${userId}`);
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
      const response = await axiosinstance.get(`/profiledetail/${id}`);
      console.log(response.data);
      return response.data.profile; // full profile object
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to fetch profile";
      return rejectWithValue(errMsg);
    }
  }
);

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
      console.log(response.data);
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
        return {
          updated: response.data.data,
          validationErrors: response.data.errors || [],
          modifiedFields: response.data.modifiedFields || [],
          skippedFields: response.data.skippedFields || [],
          commonCompanies: response.data.commonCompanies || []
        };
      }
      return rejectWithValue({
        message: response.data.error || 'Update failed',
        details: response.data.details
      });
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || error.response?.data?.message || error.message,
        details: error.response?.data?.details
      });
    }
  }
);

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
    publicProfiles: [], // Now contains only validatable profiles
    publicProfilesLoading: false,
    publicProfilesError: null,
    badgeScore: 0,       
    badgeLevel: '',  
    updatedProfile: null,
    validationErrors: [],    
    successMessage: '',
    // Company validation states
    canValidate: false,
    validationCheckLoading: false,
    validationCheckError: null,
    commonCompanies: [],
    sharedUsers: [],
    sharedUsersLoading: false,
    sharedUsersError: null,
    validationMessage: ''
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
    resetValidationState: (state) => {
      state.canValidate = false;
      state.validationCheckLoading = false;
      state.validationCheckError = null;
      state.commonCompanies = [];
      state.validationMessage = '';
    },
    clearValidationErrors: (state) => {
      state.validationErrors = [];
      state.error = null;
    }
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

      // Fetch Public Profiles (now company-filtered)
      .addCase(fetchPublicProfiles.pending, (state) => {
        state.publicProfilesLoading = true;
        state.publicProfilesError = null;
      })
      .addCase(fetchPublicProfiles.fulfilled, (state, action) => {
        state.publicProfilesLoading = false;
        state.publicProfiles = action.payload.profiles || [];
        state.successMessage = action.payload.message || 'Profiles loaded successfully';
      })
      .addCase(fetchPublicProfiles.rejected, (state, action) => {
        state.publicProfilesLoading = false;
        state.publicProfilesError = action.payload;
      })

      // Check Can Validate
      .addCase(checkCanValidate.pending, (state) => {
        state.validationCheckLoading = true;
        state.validationCheckError = null;
      })
      .addCase(checkCanValidate.fulfilled, (state, action) => {
        state.validationCheckLoading = false;
        state.canValidate = action.payload.canValidate;
        state.commonCompanies = action.payload.commonCompanies || [];
        state.validationMessage = action.payload.message || '';
      })
      .addCase(checkCanValidate.rejected, (state, action) => {
        state.validationCheckLoading = false;
        state.validationCheckError = action.payload;
        state.canValidate = false;
      })

      // Fetch Shared Company Users
      .addCase(fetchSharedCompanyUsers.pending, (state) => {
        state.sharedUsersLoading = true;
        state.sharedUsersError = null;
      })
      .addCase(fetchSharedCompanyUsers.fulfilled, (state, action) => {
        state.sharedUsersLoading = false;
        state.sharedUsers = action.payload.sharedUsers || [];
      })
      .addCase(fetchSharedCompanyUsers.rejected, (state, action) => {
        state.sharedUsersLoading = false;
        state.sharedUsersError = action.payload;
      })

      // Fetch Profile by ID (used in detail page)
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
        state.selectedProfile = action.payload;
        console.log("✅ Redux stored selectedProfile:", action.payload);
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

      // Update Badge Scores with enhanced error handling
      .addCase(updateBadgeScores.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.validationErrors = [];
      })
      .addCase(updateBadgeScores.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.updatedProfile = action.payload.updated;
        state.validationErrors = action.payload.validationErrors || [];
        state.commonCompanies = action.payload.commonCompanies || [];
        state.successMessage = action.payload.modifiedFields?.length > 0 ? 
          `Successfully updated ${action.payload.modifiedFields.length} fields` : 
          'Validation submitted successfully';
      })
      .addCase(updateBadgeScores.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Update failed";
        state.validationMessage = action.payload?.details?.message || '';
      })

      // Fetch Profile Picture
      .addCase(fetchProfilePicture.pending, (state) => {
        state.pictureLoading = true;
        state.pictureError = null;
      })
      .addCase(fetchProfilePicture.fulfilled, (state, action) => {
        state.pictureLoading = false;
        state.picture = action.payload;
      })
      .addCase(fetchProfilePicture.rejected, (state, action) => {
        state.pictureLoading = false;
        state.pictureError = action.payload;
      });
  }
});

export const { 
  resetProfileState, 
  setFormData, 
  resetValidationState, 
  clearValidationErrors 
} = profileSlice.actions;

export default profileSlice.reducer;