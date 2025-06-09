import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function DetailRiwayatViews() {
  const navigate = useNavigate();

  const handleRetake = () => {
    navigate("/intro-evaluasi");
  };

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const tanggalEvaluasi = "05 Juni 2025";
  const jamEvaluasi = "13:45 WIB";

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
          {["Depresi", "Kecemasan", "Stres"].map((label, index) => (
            <div
              key={index}
              className="bg-white border border-accent/40 rounded-md overflow-hidden"
            >
              {/* Garis hijau atas */}
              <div className="h-[6px] bg-accent-700" />

              <div className="p-4 mt-2 text-left">
                <h2 className="text-lg text-gray-700 mb-1">{label}</h2>
                <p className="text-2xl font-bold text-black mb-3">Ringan</p>
                <span className="inline-flex w-40 justify-between items-center bg-accent text-white text-md font-medium px-4 py-2 rounded-full">
                  <span>Skor</span>
                  <span>... / ...</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rekomendasi Section */}
        <div className="bg-green-100 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Rekomendasi</h3>
          <ul className="space-y-2 text-gray-700">
            {[1, 2, 3, 4].map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span>Rekomendasi</span>
              </li>
            ))}
          </ul>
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
