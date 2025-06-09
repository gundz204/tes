import axios from "axios";

export const getAllBerita = async () => {
  try {
    const response = await axios.get("http://35.219.5.8:3000/news");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
