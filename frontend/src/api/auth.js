import axios from 'axios';

const BASE_URL = 'http://localhost:8001/api';

export const register = (data) => {
  return axios.post(`${BASE_URL}/auth/users/`, data);
};

export const login = (data) => {
  return axios.post(`${BASE_URL}/token/`, data);
};
