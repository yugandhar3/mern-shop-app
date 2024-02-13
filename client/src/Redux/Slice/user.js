import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user:{},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  // To handle Async data through redux toolkit
  extraReducers: (builder) => {

  },
});

// Action creators are generated for each case reducer function
export const {
  updateUser,

} = userSlice.actions;

export default userSlice.reducer;