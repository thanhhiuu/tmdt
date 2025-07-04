// eslint-disable-next-line
import { createSlice } from '@reduxjs/toolkit';
import * as actions from '././appAction';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: [],
    isLoading: false,
    errorMessage: '',
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message || 'Lỗi không xác định';
    });
  },
});

export default appSlice.reducer;
