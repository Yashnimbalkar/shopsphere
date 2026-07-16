import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { id, product_id, name, price, image, quantity, stock_quantity }
  loading: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload
    },
    setCartLoading(state, action) {
      state.loading = action.payload
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { setCart, setCartLoading, clearCart } = cartSlice.actions
export default cartSlice.reducer