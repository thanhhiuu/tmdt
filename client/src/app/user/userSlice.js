// eslint-disable-next-line
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isLoggedin: false,
    token: '',
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    register: (state, action) => {
      state.isLoggedin = false;
      state.userData = '';
      state.token = '';
    },
  },

  //   extraReducers: (builder) => {
  //     builder.addCase(actions.getProduct.pending, (state) => {
  //       state.isLoading = true;
  //     });
  //     builder.addCase(actions.getProduct.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.product = action.payload;
  //     });
  //     builder.addCase(actions.getProduct.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.errorMessage = action.payload?.message || 'Lỗi không xác định';
  //     });
  //   },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
