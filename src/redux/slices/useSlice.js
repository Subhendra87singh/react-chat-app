import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    loginStatus: false,
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
    },
})

export const { addUser, addLoginStatus } = userSlice.actions

export default userSlice.reducer