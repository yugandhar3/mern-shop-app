import { createSlice } from '@reduxjs/toolkit';
import {updateCartDetails,getCartDetails,updateCartItemQuantity} from "../reduxThunk/cart";

const initialState = {
  isCartLoading: false,
  cartError: "",
  cartData: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartItemQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const updatedCart = state.cartData.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      state.cartData = updatedCart;
    },
  },
  // To handle Async data through redux toolkit
  extraReducers: (builder) => {
    builder.addCase(updateCartDetails.pending, (state, action) => {
      state.isCartLoading = true;
    });
    builder.addCase(updateCartDetails.fulfilled, (state, action) => {
      const productToAdd = action.payload;
      state.isCartLoading = false;
      const existingProduct = state.cartData.find(item => item._id === productToAdd._id);
      if (existingProduct) {
        // Update isAddedToCart property for existing product
        existingProduct.isAddedToCart = true;
      } else {
        // Add new product to cart with isAddedToCart property
        state.cartData.push({ ...productToAdd, isAddedToCart: true });
      }
    });
    builder.addCase(updateCartDetails.rejected, (state, action) => {
      state.isCartLoading = false;
      state.cartError = 'error data';
      state.cartData = [];
    });
    builder.addCase(getCartDetails.pending, (state, action) => {
      state.isCartLoading = true;
    });
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      state.isCartLoading = false;
      state.cartData=action.payload
    });
    builder.addCase(getCartDetails.rejected, (state, action) => {
      state.isCartLoading = false;
      state.cartError = 'error data';
      state.cartData = [];
    });
    builder.addCase(updateCartItemQuantity.pending, (state, action) => {
      state.isCartLoading = true;
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      const updatedItem = action.payload;
      state.cartData = state.cartData.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      );
    });
    builder.addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.isCartLoading = false;
      state.cartError = 'error data';
      state.cartData = [];
    });

  },
});


export default cartSlice.reducer;