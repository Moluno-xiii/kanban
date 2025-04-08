import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ProfileTypes {
  id: string | null;
  profile_picture: string | null;
  display_name: string | null;
}
interface UserData {
  profileData: ProfileTypes;
}

const initialState: UserData = {
  profileData: {
    id: null,
    profile_picture: null,
    display_name: null,
  },
};

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ data: ProfileTypes }>) => {
      state.profileData = action.payload.data;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
