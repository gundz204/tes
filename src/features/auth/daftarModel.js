import axios from 'axios';

export async function registerUser(data) {
  try {
    const response = await axios.post(
      "https://sehati-api.arykurnia.my.id/register",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Register gagal");
    } else if (error.request) {
      throw new Error("Tidak ada respon dari server");
    } else {
      throw new Error(error.message);
    }
  }
}
