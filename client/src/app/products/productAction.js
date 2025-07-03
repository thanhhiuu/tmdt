// eslint-disable-next-line
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import * as apis from '../../apis';

export const getProduct = createAsyncThunk(
  'product/product-categories',
  async (data, { rejectWithValue }) => {
    const reponse = await apis.apiProduct();
    // console.log('hi', reponse);
    if (!reponse.success) return rejectWithValue(reponse);
    return reponse.message;
  }
);
