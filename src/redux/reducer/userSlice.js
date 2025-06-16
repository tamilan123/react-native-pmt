import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  login: false,
  loading: false,
  error: false,
  errorData: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.login = true;
      state.data = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = true;
      state.errorData = action.payload;
    },
    loginWithOTP(state) {
      state.loading = false;
      state.login = false;
    },
    logout() {
      return initialState;
    }
  }
});

// Selectors (optional but useful)
export const getUser = (state) => state.user?.data;
export const isUserLoggedIn = (state) => state.user?.login;

// Export actions and reducer
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginWithOTP,
  logout
} = userSlice.actions;

export default userSlice.reducer;
