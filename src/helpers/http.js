import axios from "axios";

const http = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: "https://adventurous-baseball-cap-newt.cyclic.app",
    headers,
  });
  return instance;
};

export default http;
