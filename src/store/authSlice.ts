import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; session: Session }>,
    ) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
    clearUser: (state) => {
      state.user = null;
      state.session = null;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<{ message: string }>) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<{ loadingState: boolean }>) => {
      state.error = "";
      state.loading = action.payload.loadingState;
    },
  },
});

export const { setUser, clearUser, logout, setError, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
