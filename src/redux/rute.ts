import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RuteState {
    rute: any;
}

const initialRute = (): any => {
    return null;
};

const initialState: RuteState = {
    rute: initialRute(),
};

export const ruteSlice = createSlice({
    name: "rute",
    initialState,
    reducers: {
        handleRute: (state, action: PayloadAction<any>) => {
            state.rute = action.payload;
        },
    },
});

export const {
    handleRute,
} = ruteSlice.actions;

export default ruteSlice.reducer;