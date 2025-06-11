import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailRiwayat } from "./riwayatPresenter";

export default function DetailRiwayatViews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getDetailRiwayat(id);
        setData(result.data);
        console.log(result.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const handleRetake = () => {
    navigate("/intro-evaluasi");
  };

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const tanggalEvaluasi = data?.createdAt?.split("T")[0];
  const jamEvaluasi = data?.createdAt?.split("T")[1].split(".")[0];

  const dataHasil = data?.hasil

  const hasilList = [
    {
      label: "Depresi",
      kategori: dataHasil?.depresi.categorie || "-",
      skor: dataHasil?.depresi.score || 0,
      maksimum: dataHasil?.depresi.maksimum || 21,
    },
    {
      label: "Kecemasan",
      kategori: dataHasil?.kecemasan.categorie || "-",
      skor: dataHasil?.kecemasan.score || 0,
      maksimum: dataHasil?.kecemasan.maksimum || 21,
    },
    {
      label: "Stres",
      kategori: dataHasil?.stres.categorie || "-",
      skor: dataHasil?.stres.score || 0,
      maksimum: dataHasil?.stres.maksimum || 21,
    },
  ];

  const rekomendasiHasil = dataHasil?.rekomendasi;

  return (
    <div className="py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate("/riwayat")}
          className="flex items-center text-sm text-green-700 hover:underline mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Kembali ke Riwayat
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
          Hasil Evaluasi Kesehatan Mental
        </h1>

        <p className="text-center text-sm text-gray-600 mb-8">
          Evaluasi dilakukan pada <strong>{tanggalEvaluasi}</strong> pukul{" "}
          <strong>{jamEvaluasi}</strong>
        </p>

        {/* Skor Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-4 min-h-[180px]">
          {hasilList.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-green-700/40 rounded-md overflow-hidden"
            >
              {/* Garis hijau atas */}
              <div className="h-[6px] bg-green-700" />

              <div className="p-4 mt-2 text-left">
                <h2 className="text-lg text-gray-700 mb-1">{item.label}</h2>
                <p className="text-2xl font-bold text-black mb-3">{item.kategori}</p>
                <span className="inline-flex w-40 justify-between items-center bg-accent text-white text-md font-medium px-4 py-2 rounded-full">
                  <span>Skor</span>
                  <span>{item.skor} / {item.maksimum}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rekomendasi Section */}
        <div className="bg-green-100 py-6 pl-6 rounded-lg mb-6 max-h-64 overflow-hidden scrollbar-thin custom-scrollbar inset-shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">Rekomendasi</h3>
          <div
            className="text-gray-700 space-y-3 text-sm overflow-y-auto max-h-40 pr-6 scrollbar-thin custom-scrollbar"
            style={{ whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{
              __html: (rekomendasiHasil || "")
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n(\d+)\.\s+(.*?)(?=\n\d+\.|\n?$)/gs, (_, num, content) => {
                  const [judul, ...isi] = content.split(':');
                  return `<div class="pl-5 relative mt-2 text-justify"><span class="absolute left-0">${num}.</span> <strong>${judul}:</strong>${isi.join(':')}</div>`;
                })
            }}
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-center gap-4 md:gap-6 mb-10">
          <button
            onClick={handleRetake}
            className="border border-green-700 text-green-700 px-2 md:px-6 py-2 rounded-lg hover:bg-green-700 hover:text-white flex items-center gap-2 transition"
          >
            Tes Ulang
          </button>
          <button
            onClick={handleBackToDashboard}
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 flex items-center gap-2 transition"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
