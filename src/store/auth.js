
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ?? null
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload; // Sadece dizilebilen verileri kaydediyoruz
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        }
    }
});

export const { login, logout } = auth.actions;
export default auth.reducer;
