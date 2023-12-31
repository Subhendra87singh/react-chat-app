import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    loginStatus: false,
    selectedUser: {},
}

export const userSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {

        addUser: (state, action) => {
            state.user = action.payload
        },
        addLoginStatus: (state, action) => {
            state.loginStatus = action.payload
        },
        addSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
    },
})

export const { addUser, addLoginStatus, addSelectedUser } = userSlice.actions

export default userSlice.reducer