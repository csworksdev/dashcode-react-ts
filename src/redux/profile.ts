import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// theme config import
import themeConfig from "@/configs/themeConfig";

interface ProfileState {
    profile: any;
}

const initialProfile = (): any => {
    return null;
};

const initialState: ProfileState = {
    profile: initialProfile(),
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        handleProfile: (state, action: PayloadAction<ProfileResponseType | null>) => {
            state.profile = action.payload;
        },
    },
});

export const {
    handleProfile,
} = profileSlice.actions;

export default profileSlice.reducer;