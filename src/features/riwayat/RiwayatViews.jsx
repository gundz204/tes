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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [loading, setLoading] = useState(false)

  // Filter berdasarkan search
  const filteredItems = riwayat.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const numA = parseInt(a.title.match(/\d+/)?.[0]) || 0;
    const numB = parseInt(b.title.match(/\d+/)?.[0]) || 0;

    return sortBy === "asc" ? numA - numB : numB - numA;
  });


  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getRiwayatData();
        console.log("Hasil data:", data);
        setRiwayat(data);
      } catch (error) {
        console.error("Gagal mengambil data riwayat:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          name: parsedUser.name,
          email: parsedUser.email,
          gender: parsedUser.gender
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  console.log(riwayat)

  return (
    <Layout>
      <div className="min-h-screen bg-white my-4 md:my-6 flex flex-col md:flex-row gap-6 md:mr-4">
        {/* Sidebar */}
        <aside className="w-full mt-0 md:mt-2 md:w-1/4 bg-secondary rounded-xl p-4 flex flex-col items-center text-center md:max-h-[300px] md:ml-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mb-1 mt-1 md:mt-4">
            <img
              src={
                user.gender === "male"
                  ? "https://avatar.iran.liara.run/public/47"
                  : user.gender === "female"
                    ? "https://avatar.iran.liara.run/public/88"
                    : "https://avatar.iran.liara.run/public/47"
              }
              alt="avatar"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600 mb-3">{user.email}</p>
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-10 py-1 border border-accent rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />

                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <button
                onClick={() => {
                  setSortBy(prev => prev === "asc" ? "desc" : "asc");
                  setCurrentPage(1);
                }}
                className="border border-accent text-black px-3 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-accent hover:text-white transition"
              >
                {sortBy === "asc" ? <AiOutlineSortAscending /> : <AiOutlineSortAscending className="rotate-180" />}
                Urutkan
              </button>
            </div>
          </div>

          {/* Activity List */}
          <div className="flex flex-col gap-6">
            {loading
              ? Array(3).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="bg-secondary border border-accent p-4 rounded-lg flex justify-between items-start animate-pulse"
                >
                  <div className="flex-1">
                    <div className="h-4 bg-white/70 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/70 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-white/70 rounded w-full"></div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="h-5 w-16 bg-white/70 rounded-full"></div>
                    <div className="h-7 w-7 bg-white/70 rounded-md mt-8"></div>
                  </div>
                </div>
              ))
              : currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-secondary border border-accent p-4 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-semibold text-base text-black">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <p className="text-sm mt-1 text-gray-800">
                      Skor: Depresi ({item.skor.depresi}), Kecemasan (
                      {item.skor.kecemasan}), Stress ({item.skor.stress})
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[item.level]}`}
                    >
                      {item.level}
                    </span>
                    <button
                      onClick={() => navigate(`/riwayat/${item.id}`)}
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
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border border-accent text-black px-3 py-1 rounded-md text-sm hover:bg-accent hover:text-white transition disabled:opacity-50"
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`border border-accent px-3 py-1 rounded-md text-sm ${currentPage === index + 1
                  ? "bg-accent text-white"
                  : "text-black hover:bg-accent hover:text-white transition"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border border-accent text-black px-3 py-1 rounded-md text-sm hover:bg-accent hover:text-white transition disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
