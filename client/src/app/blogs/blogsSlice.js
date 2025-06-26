// eslint-disable-next-line
import { createSlice } from '@reduxjs/toolkit';
import * as actions from '././blogAction';

export const appSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    isLoading: false,
    errorMessage: '',
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(actions.getBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });
    builder.addCase(actions.getBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message || 'Lỗi không xác định';
    });
  },
});

export default appSlice.reducer;
