import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getRiwayatData } from "./riwayatPresenter";
import { AiOutlineSortAscending, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const levelColor = {
  Rendah: "bg-blue-500 text-white",
  Sedang: "bg-orange-500 text-white",
  Tinggi: "bg-red-500 text-white",
};

export default function RiwayatViews() {
  const [riwayat, setRiwayat] = useState([]);
  const navigate = useNavigate(); // <-- Tambahkan ini agar bisa pakai navigate

  useEffect(() => {
    const data = getRiwayatData();
    setRiwayat(data);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white my-4 md:my-6 flex flex-col md:flex-row gap-6 md:mr-4">
        {/* Sidebar */}
        <aside className="w-full mt-0 md:mt-2 md:w-1/4 bg-secondary rounded-xl p-4 flex flex-col items-center text-center md:max-h-[300px] md:ml-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mb-1 mt-1 md:mt-4">
            <img
              src="/src/assets/avatar_profile1.png"
              alt="avatar"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold">User123</h2>
          <p className="text-sm text-gray-600 mb-3">user123@gmail.com</p>
          <button 
          onClick={() => navigate("/profil")}
          className="bg-white border border-accent px-4 py-2 rounded-md text-sm hover:bg-accent hover:text-white transition">
            Ubah Profil
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:pl-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-xl font-semibold text-black">
              Riwayat Aktivitas
            </h3>
            <div className="flex gap-2 md:gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari.."
                  className="w-full px-10 py-1 border border-accent rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />

                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <button className="border border-accent text-black px-3 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-accent hover:text-white transition">
                <AiOutlineSortAscending />
                Urutkan
              </button>
            </div>
          </div>

          {/* Activity List */}
          <div className="flex flex-col gap-6">
            {riwayat.map((item) => (
              <div
                key={item.id}
                className="bg-secondary border border-accent p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-base text-black">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">{item.date}</p>
                  <p className="text-sm mt-1 text-gray-800">
                    Skor: Depresi ({item.skor.depresi}), Kecemasan (
                    {item.skor.kecemasan}), Stress ({item.skor.stress})
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      levelColor[item.level]
                    }`}
                  >
                    {item.level}
                  </span>
                  <button
                    onClick={() => navigate("/detail-riwayat")}
                    className="text-gray-500 hover:text-black text-lg w-7 h-7 rounded-md border border-black-300 p-1 mt-8 hover:bg-primary"
                  >
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button className="border border-accent text-black px-3 py-1 rounded-md text-sm hover:bg-accent hover:text-white transition">
              &lt;
            </button>
            <button className="border border-accent px-3 py-1 rounded-md text-sm bg-accent text-white">
              1
            </button>
            <button className="border border-accent text-black px-3 py-1 rounded-md text-sm hover:bg-accent hover:text-white transition">
              2
            </button>
            <button className="border border-accent text-black px-3 py-1 rounded-md text-sm hover:bg-accent hover:text-white transition">
              3
            </button>
            <button className="border border-accent text-black px-3 py-1 rounded-md text-sm hover:bg-accent hover:text-white transition">
              &gt;
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
