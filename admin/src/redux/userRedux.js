import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    users: null,
    isFetching: false,
    error: false
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching =  true;
        },
        loginSuccess: (state, action) => {
            state.isFetching =  false;
            state.currentUser =  action.payload;
        },
        loginFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        logout: () => initialState,
        getUsersStart: (state) => {
            state.isFetching =  true;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching =  false;
            state.users =  action.payload;
        },
        getUsersFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        addUserStart: (state) => {
            state.isFetching =  true;
        },
        addUserSuccess: (state, action) => {
            state.isFetching =  false;
            state.users.push(action.payload);
        },
        addUserFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        updateUserStart: (state) => {
            state.isFetching =  true;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching =  false;
            state.users[state.users.findIndex((item) => item._id === action.payload.id)] = action.payload.user
        },
        updateUserFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        deleteUserStart: (state) => {
            state.isFetching =  true;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching =  false;
            state.users.splice(state.users.findIndex((item) => item._id === action.payload), 1);
        },
        deleteUserFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        }
    }
});

export const { loginStart, loginSuccess, loginFailed, logout, 
                getUsersStart, getUsersSuccess, getUsersFailed,
                addUserStart, addUserSuccess, addUserFailed,
                updateUserStart, updateUserSuccess, updateUserFailed,
                deleteUserStart, deleteUserSuccess, deleteUserFailed } = userSlice.actions;
export default userSlice.reducer;