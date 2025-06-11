import axios from "axios";

// Helper untuk ambil data dari localStorage
const getAuthData = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user?.userId) throw new Error("Auth data not found");
    return { token, userId: user.userId };
  } catch (error) {
    console.error("Failed to get auth data:", error.message);
    return null;
  }
};

export const riwayatModel = {
  async getAll() {
    const auth = getAuthData();
    if (!auth) return [];

    try {
      const response = await axios.get(
        `https://sehati-api.arykurnia.my.id/history/${auth.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      return response.data.data.map((item, index) => ({
        id: item.id,
        title: `Evaluasi ${index + 1}`,
        date: item.createdAt.split("T")[0],
        time: item.createdAt.split("T")[1].split(".")[0],
        skor: {
          depresi: item.hasil.depresi.score,
          kecemasan: item.hasil.kecemasan.score,
          stress: item.hasil.stres.score,
        },
        level: item.hasil.rataRata.categorie,
      }));
    } catch (error) {
      console.error("Failed to fetch riwayat:", error.message);
      return [];
    }
  },

  async getById(id) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak ditemukan di localStorage");

    const response = await fetch(`https://sehati-api.arykurnia.my.id/assessments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },

  async search(keyword) {
    const data = await this.getAll();
    return data.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  },

  async sortByDate(order = "desc") {
    const data = await this.getAll();
    return data.sort((a, b) => {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
  },
};
