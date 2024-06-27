import { createSlice } from "@reduxjs/toolkit";
import { isNullableType } from "graphql";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null,
        didTryAutoLogin: false
    },
    reducers: {
        authenticate: (state, action)=>{
            const { payload } = action
            state.token = payload.token
            state.userData = payload.userData
            state.didTryAutoLogin = true
        },
        setDidTryAutoLogin: (state, action) => {
            state.didTryAutoLogin = true
        }
    }
});

export const authenticate = authSlice.actions.authenticate;

export default authSlice.reducer