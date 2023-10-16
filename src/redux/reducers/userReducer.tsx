import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { CreateUser, UserState } from '../../types/User'
import axios, { AxiosError } from 'axios'

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
}

export const createUserAsync = createAsyncThunk(
    'createProductAsync',
    async (newProduct: CreateUser) => {
        try {
            const result = await axios.post('https://api.escuelajs.co/api/v1/users/', newProduct)
            if (result.status === 201) {
                return result.data
            }

        }
        catch (e) {
            const error = e as AxiosError
            throw new Error(error.message)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)) {
                    state.users.push(action.payload)
                }
            })
            .addCase(createUserAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.message,
                    }
                }
            })
    }
})

const userReducer = usersSlice.reducer
export default userReducer
