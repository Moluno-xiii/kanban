import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import supabase from "../supabase";
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

export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async (_, thunkAPI) => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.warn(sessionError?.message);

      return thunkAPI.rejectWithValue(sessionError?.message);
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }

    return { session, user, sessionError };
  },
);

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
    },
    setError: (state, action: PayloadAction<{ message: string }>) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initializeUser.fulfilled,
        (state, action: PayloadAction<{ user: User; session: Session }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.session = action.payload.session;
        },
      )
      .addCase(initializeUser.rejected, (state, action) => {
        console.warn(action.payload as string);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, logout, setError } = authSlice.actions;

export default authSlice.reducer;
