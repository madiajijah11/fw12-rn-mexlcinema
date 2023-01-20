import axios from 'axios';
import { API_URL } from '@env';

const http = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: API_URL,
    headers
  });
  return instance;
};

export default http;
