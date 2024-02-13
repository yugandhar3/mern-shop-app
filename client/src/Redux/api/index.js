import axios from 'axios';

const url = 'http://localhost:5000/api';

// User api
export const getUser = () => axios.get(`${url}/user`);

// product api
export const getProduct = () => axios.get(`${url}/products`);

//Cart api
export const createCart = (data) => axios.post(`${url}/cart`,data);
export const getCart = (id) => axios.get(`${url}/cart/${id}`);
export const deleteCartItem = (id) => axios.delete(`${url}/cart/${id}`);
export const deleteAllCartItem = (id) => axios.delete(`${url}/clearCart/${id}`);
export const updateCartItemQuantity=(data)=>axios.put(`${url}/cart`,data);

// Payment api's
export const checkout=(data)=>axios.post(`${url}/create-checkout-session`,data);
export const getCheckoutDetails=(id)=>axios.get(`${url}/get-order-details/${id}`);
export const getOrderDetails=(id)=>axios.get(`${url}/get-orders/${id}`);
