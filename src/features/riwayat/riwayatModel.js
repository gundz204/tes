// src/features/riwayat/riwayatModel.js

const dummyData = [
  {
    id: 1,
    title: "Evaluasi 1",
    date: "2025-06-01",
    skor: { depresi: 5, kecemasan: 3, stress: 4 },
    level: "Rendah",
  },
  {
    id: 2,
    title: "Evaluasi 2",
    date: "2025-06-02",
    skor: { depresi: 7, kecemasan: 6, stress: 5 },
    level: "Sedang",
  },
  {
    id: 3,
    title: "Evaluasi 3",
    date: "2025-06-03",
    skor: { depresi: 9, kecemasan: 8, stress: 7 },
    level: "Tinggi",
  },
];

export const riwayatModel = {
  getAll() {
    return dummyData;
  },
  getById(id) {
    return dummyData.find((item) => item.id === id);
  },
  search(keyword) {
    return dummyData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  },
  sortByDate(order = "desc") {
    return [...dummyData].sort((a, b) => {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
  },
};
