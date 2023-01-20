import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const getUserInfo = createAsyncThunk(
  'profile/getUserInfo',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await http(auth.token).get('/api/v1/profile');
      return data.results;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
