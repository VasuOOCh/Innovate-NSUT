import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    _id: string;
    username: string;
    email: string;

}

interface UserState {
    currentUser: User | null;
    pending: boolean;
    error: boolean;
}

const initialState: UserState = {
    currentUser: null,
    pending: false,
    error: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart: (state: any) => {
            state.pending = true;
        },
        fetchUserSuccess: (state: UserState, action: PayloadAction<User>) => {
            state.pending = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        fetchUserFailure: (state: UserState) => {
            state.pending = false;
            state.error = true;
        },
    },
});

export const {
    fetchUserStart,
    fetchUserFailure,
    fetchUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
