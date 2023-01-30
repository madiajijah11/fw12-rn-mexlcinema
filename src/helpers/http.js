import axios from 'axios';
import Constants from 'expo-constants';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: Constants.expoConfig.extra.API_URL || process.env.API_URL,
    headers
  });
  return instance;
};

export default http;
