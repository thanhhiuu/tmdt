// eslint-disable-next-line
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import * as apis from '../../apis';

export const getBlogs = createAsyncThunk(
  'blog/blog-categories',
  async (data, { rejectWithValue }) => {
    const reponse = await apis.apiBlog();
    console.log('kokok', reponse);
    if (!reponse.success) return rejectWithValue(reponse);
    return reponse.message;
  }
);
