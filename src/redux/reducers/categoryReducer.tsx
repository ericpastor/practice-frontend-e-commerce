import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Category, CategoryState } from '../../types/Product'



export const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
}

export const getAllCategoriesAsync = createAsyncThunk(
    'getAllCategoriesAsync',
    async () => {
        try {
            const result = await axios.get(
                `https://api.escuelajs.co/api/v1/categories`
            )
            const data: Category[] = await result.data
            return data
        } catch (e) {
            const error = e as AxiosError
            throw new Error(error.message)
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(getAllCategoriesAsync.pending, (state, action) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllCategoriesAsync.rejected, (state, action) => {
                if (action.payload instanceof Error) {
                    return {
                        ...state,
                        error: action.payload.message,
                    }
                }
            })
    },
})

const categoryReducer = categoriesSlice.reducer
export default categoryReducer
