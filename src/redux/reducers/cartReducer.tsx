import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { CartItem } from "../../types/CartItem"
import { Product } from "../../types/Product"

const initialState: CartItem[] = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const cartItem: CartItem = { ...action.payload, quantity: 1 }
            const foundIndex = state.findIndex(item => item.id === action.payload.id)
            if (foundIndex !== -1) {
                state[foundIndex].quantity++
            } else {
                state.push(cartItem)
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const productIdToRemove = action.payload.id
            return state.filter(item => item.id !== productIdToRemove)
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload)
            if (foundIndex > -1) {
                state[foundIndex].quantity++
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload)
            if (foundIndex > -1) {
                if (state[foundIndex].quantity === 1) {
                    state.splice(foundIndex, 1)
                } else {
                    state[foundIndex].quantity--
                }
            }
        },
        emptyCart: (state) => {
            return initialState
        }
    }
})

const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } = cartSlice.actions
export default cartReducer
