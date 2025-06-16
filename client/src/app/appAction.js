// eslint-disable-next-line
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import * as apis from '../apis';

export const getCategories = createAsyncThunk(
  'app/categories',
  async (data, { rejectWithValue }) => {
    const reponse = await apis.apiGetCategories();

    if (!reponse.success) return rejectWithValue(reponse);
    return reponse.message;
  }
);
