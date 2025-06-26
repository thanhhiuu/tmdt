import { configureStore } from '@reduxjs/toolkit';
import appSlice from './apps/appSlice';
import productSlice from './products/productSlice';
import blogSlice from './blogs/blogsSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice,
    blog: blogSlice,
  },
});
