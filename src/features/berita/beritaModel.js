import axios from "axios";

export const getAllBerita = async () => {
  try {
    const response = await axios.get("https://sehati-api.arykurnia.my.id/news");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
