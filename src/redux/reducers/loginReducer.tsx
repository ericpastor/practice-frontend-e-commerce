import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { Credentials } from '../../types/Credentials'
import { Profile, ProfileState } from '../../types/Profile'

const initialState: ProfileState = {
    profiles: [],
    loading: false,
    error: null
}

export const loginUserAsync = createAsyncThunk<Profile, Credentials, { rejectValue: string }>(
    'loginUserAsync',
    async (cred, { rejectWithValue, dispatch }) => {
        try {
            const result = await axios.post('https://api.escuelajs.co/api/v1/auth/login', cred)
            const { access_token } = result.data
            const authenticatedResult = await dispatch(authenticateUserAsync(access_token))
            if (typeof authenticatedResult.payload === 'string' || !authenticatedResult.payload) {
                throw Error(authenticatedResult.payload || 'Cannot login')
            } else {
                localStorage.setItem('access_token', access_token)
                return authenticatedResult.payload as Profile
            }
        }
        catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const authenticateUserAsync = createAsyncThunk<Profile, string, { rejectValue: string }>(
    'authenticateUserAsync',
    async (access_token, { rejectWithValue }) => {
        try {
            const result = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            const profile = await result.data
            return profile
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        logout: (state) => {
            state.profiles = []
            localStorage.removeItem('access_token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.currentProfile = action.payload
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(authenticateUserAsync.fulfilled, (state, action) => {
                state.currentProfile = action.payload
            })
            .addCase(authenticateUserAsync.pending, (state, action) => {
                if (action.payload)
                    return {
                        ...state,
                        loading: true
                    }
            })
    }
})

const loginReducer = loginSlice.reducer
export const { logout } = loginSlice.actions
export default loginReducer
