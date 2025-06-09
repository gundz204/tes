import axios from "axios";

const BASE_URL = 'http://35.219.5.8:3000';

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Gagal login. Silakan coba lagi.";
    throw new Error(message);
  }
};
