import { configureStore } from '@reduxjs/toolkit';
import appSlice from './apps/appSlice';
import productSlice from './products/productSlice';
import userSlice from './user/userSlice';
import blogSlice from './blogs/blogsSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persitConfig = {
  key: 'root',
  storage,
  whitelist: ['userData', 'token', 'isLoggedin'],
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    product: productSlice,
    blog: blogSlice,
    user: persistReducer(persitConfig, userSlice),
  },
  // Giúp bỏ qua cảnh báo trên log
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persitor = persistStore(store);
