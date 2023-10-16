import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  CreateProduct,
  PaginationProducts,
  Product,
  ProductById,
  ProductId,
  ProductState,
  UpdateProduct,
} from '../../types/Product'

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
}

export const getAllProductsAsync = createAsyncThunk<Product[], PaginationProducts, { rejectValue: string }>(
  'getAllProductsAsync',
  async ({ limit, offset }: PaginationProducts, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      )
      const data: Product[] = await result.data
      return data
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
)

export const getProductByIdAsync = createAsyncThunk(
  'getProductByIdAsync',
  async ({ id }: ProductById) => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      )
      const data: Product = await result.data
      return data
    } catch (e) {
      const error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

export const createProductAsync = createAsyncThunk(
  'createProductAsync',
  async (newProduct: CreateProduct) => {
    try {
      const result = await axios.post('https://api.escuelajs.co/api/v1/products/', newProduct)
      return result.data
    }
    catch (e) {
      const error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

export const updateProductAsync = createAsyncThunk(
  'updateProductAsync',
  async (input: UpdateProduct): Promise<Product> => {
    try {
      const result = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${input.id}`,
        input.update
      )
      const updatedProduct = result.data
      return updatedProduct
    } catch (e) {
      const error = e as AxiosError
      throw new Error(error.message)
    }
  }
)

export const deleteProductAsync = createAsyncThunk(
  'deleteProductAsync',
  async (id: ProductId) => {
    try {
      const result = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/products/${id}`)
      if (!result.data) {
        throw new Error('Cannot delete')
      }
      return id
    }
    catch (e) {
      const error = e as Error
      return error.message
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
      action.payload === 'asc'
        ? state.products.sort((a, b) => a.price - b.price)
        : state.products.sort((a, b) => b.price - a.price)
    },
    removeProduct: (state, action: PayloadAction<ProductId>) => {
      return {
        products: state.products.filter((p) => p.id !== action.payload),
        loading: false,
        error: null,
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        const newProducts = action.payload
        const prevProducts = state.products

        if (!(action.payload instanceof Error)) {
          return {
            ...state,
            products: prevProducts.concat(newProducts),
            loading: false,
            error: null,
          }
        }
      })
      .addCase(getAllProductsAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        return state
      })
      .addCase(getProductByIdAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            error: action.payload.message,
          }
        }
      })

      .addCase(createProductAsync.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          state.products.push(action.payload)
        }
      })
      .addCase(createProductAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          }
        }
      })

      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.products.find((p) =>
          p.id === action.payload.id ? action.payload : p
        )
      })
      .addCase(updateProductAsync.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message,
          }
        }
      })

      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (typeof action.payload === 'number') {
          state.products = state.products.filter(p => p.id !== action.payload)
        }
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            loading: false,
            error: action.payload.message
          }
        }
      })
  },
})

const productReducer = productsSlice.reducer
export const { sortByPrice, removeProduct } =
  productsSlice.actions
export default productReducer


