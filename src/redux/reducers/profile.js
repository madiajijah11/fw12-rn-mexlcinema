import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../actions/profile';

const initialState = {
  loading: false,
  userInfo: null,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default profileSlice.reducer;
