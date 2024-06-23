import {createSlice} from '@reduxjs/toolkit';


const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const expiresAt = new Date( localStorage.getItem('expiresIn'));

console.log(isLoggedIn, expiresAt);

const initialState = {
    isLoggedIn: isLoggedIn && expiresAt > Date.now(), // Compare expiresAt with the current date
};

console.log(initialState);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: state => {
            state.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
        },
        logout: state => {
            state.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

