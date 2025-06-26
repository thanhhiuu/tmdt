// eslint-disable-next-line
import { createSlice } from '@reduxjs/toolkit';
import * as actions from '././productAction';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    isLoading: false,
    errorMessage: '',
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(actions.getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(actions.getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message || 'Lỗi không xác định';
    });
  },
});

export default productSlice.reducer;
