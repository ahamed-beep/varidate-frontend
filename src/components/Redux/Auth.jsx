import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../Connection/Api";
import { toast } from "react-toastify";

// Signup Thunk
export const signupuserform = createAsyncThunk(
  "signupuser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("/post", user);
  toast.success(response.data.message);
return response.data; // ✅ send back data for frontend to use

    } catch (error) {
      const errMsg = error.response?.data?.message || "Signup failed";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

// Login Thunk
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Auto-login thunk
const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
  localStorage.removeItem("hasAccess");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
};

// Auto-login thunk with strict access control
export const autoLogin = createAsyncThunk(
  "auth/autoLogin",
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    
  if (!token) {
  clearAuthStorage();
  return rejectWithValue("No token found");
}


    try {
      const response = await axiosinstance.get("/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.valid) {
        dispatch(clearAuthStorage());
        return rejectWithValue(response.data.message);
      }

      const user = response.data.user;
      
      if (user.hasAccess === false) {
        dispatch(clearAuthStorage());
        return rejectWithValue("Account access denied");
      }

      return {
        user,
        token
      };
    } catch (error) {
      dispatch(clearAuthStorage());
      return rejectWithValue("Token verification failed");
    }
  }
);

// Login thunk - updated to store token
export const loginuserform = createAsyncThunk(
  "loginuser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("/login", user);
      const loginData = response.data;
      
      if (!loginData.success) {
        throw new Error(loginData.message);
      }

      const userData = loginData.user;

      // Store token and user data in localStorage
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("hasAccess", userData.hasAccess);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userName", `${userData.firstname} ${userData.lastname}`);

      toast.success(loginData.message);
      return loginData;
      
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Login failed";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

// Logout action
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    return true;
  }
);



export const verifyEmailToken = createAsyncThunk(
  "verifyEmail",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.post("/verify-code", { email, code });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || "Verification failed";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);


export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerificationCode",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post("/resend-code", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to resend code");
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post("/forgot-password", { email });
      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, code, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axiosinstance.post("/reset-password", { email, code, newPassword });
      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchAllUsersAdmin = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get('/admin/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const fetchUserDetailsAdmin = createAsyncThunk(
  'admin/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/users/${userId}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const updateUserAccessAdmin = createAsyncThunk(
  'admin/updateUserAccess',
  async ({ userId, hasAccess }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token; // Get token from state
      
      const response = await axiosinstance.patch(
        `/admin/users/${userId}/access`,
        { hasAccess },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }

      // 🔹 If admin blocked the *currently logged in user*, force logout
      const currentUserId = getState().auth.user?.id;
      if (currentUserId === userId && hasAccess === false) {
        dispatch(logoutUser()); // <- your logout action
      }

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to update access"
      );
    }
  }
);


const authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    message: null,
     token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    authenticated: false,
    loading: false,
    emailVerified: false,
    verificationLoading: false,
    verificationError: null,
  },
  reducers: {
    logouts: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
      state.emailVerified = false;
      state.message = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupuserform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupuserform.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupuserform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
   .addCase(autoLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(autoLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      
      // Login cases
      .addCase(loginuserform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuserform.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginuserform.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Logout case
     .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.authenticated = false;
        state.emailVerified = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      })

      // Email Verification
      .addCase(verifyEmailToken.pending, (state) => {
        state.verificationLoading = true;
        state.verificationError = null;
      })
      .addCase(verifyEmailToken.fulfilled, (state, action) => {
        state.verificationLoading = false;
        state.emailVerified = true;
        state.user = action.payload.user || state.user;
        state.verificationError = null;
      })
      .addCase(verifyEmailToken.rejected, (state, action) => {
        state.verificationLoading = false;
        state.verificationError = action.payload;
      })

      // Resend Code
      .addCase(resendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsersAdmin.pending, (state) => {
  state.adminLoading = true;
  state.adminError = null;
})
.addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
  state.adminLoading = false;
  state.adminUsers = action.payload;
})
.addCase(fetchAllUsersAdmin.rejected, (state, action) => {
  state.adminLoading = false;
  state.adminError = action.payload;
})

.addCase(fetchUserDetailsAdmin.pending, (state) => {
  state.adminLoading = true;
  state.adminError = null;
})
.addCase(fetchUserDetailsAdmin.fulfilled, (state, action) => {
  state.adminLoading = false;
  state.adminUserDetails = action.payload;
})
.addCase(fetchUserDetailsAdmin.rejected, (state, action) => {
  state.adminLoading = false;
  state.adminError = action.payload;
})

.addCase(updateUserAccessAdmin.pending, (state) => {
  state.adminLoading = true;
  state.adminError = null;
})
.addCase(updateUserAccessAdmin.fulfilled, (state, action) => {
  state.adminLoading = false;
  // Update in adminUsers list
  state.adminUsers = state.adminUsers.map(user => 
    user._id === action.payload._id ? action.payload : user
  );
  // Update in adminUserDetails if it's the same user
  if (state.adminUserDetails?._id === action.payload._id) {
    state.adminUserDetails = action.payload;
  }
})
.addCase(updateUserAccessAdmin.rejected, (state, action) => {
  state.adminLoading = false;
  state.adminError = action.payload;
})
  },
});

export default authslice.reducer;
export const { logouts } = authslice.actions;
