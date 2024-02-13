import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// Create an async thunk to update cart details in the database
export const updateCartDetails = createAsyncThunk(
  'cart/createCart',
  async (cartDetails) => {
    const response = await api.createCart(cartDetails);
    return response.data;
  }
);
export const getCartDetails = createAsyncThunk(
  'cart/getCart',
  async (id) => {
    const response = await api.getCart(id);
    return response.data;
  }
);
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (data) => {
      const response = await api.updateCartItemQuantity(data);
      return response.data;
  }
);
