import { loginUser } from "./loginModel";

const API_BASE = "http://35.219.5.8:3000/users";

export const handleLogin = async ({ email, password }, onSuccess, onError) => {
  try {
    const result = await loginUser({ email, password });

    if (result.data?.accessToken && result.data?.userId) {
      const token = result.data.accessToken;
      const userId = result.data.userId;

      localStorage.setItem("token", token);

      const res = await fetch(`${API_BASE}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data.data));
    }

    onSuccess(result);
  } catch (error) {
    onError(error.message);
  }
};
