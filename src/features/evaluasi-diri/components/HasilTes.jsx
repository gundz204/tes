import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import CardNews from "../../../components/CardNews";

export default function HasilTes({ depressionScore, anxietyScore, stressScore, berita, rekomendasiHasil }) {
  const navigate = useNavigate();

  const handleRetake = () => {
    navigate("/intro-evaluasi");
  };

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const hasilList = [
    {
      label: "Depresi",
      kategori: depressionScore?.kategori || "-",
      skor: depressionScore?.skor || 0,
      maksimum: depressionScore?.maksimum || 21,
    },
    {
      label: "Kecemasan",
      kategori: anxietyScore?.kategori || "-",
      skor: anxietyScore?.skor || 0,
      maksimum: anxietyScore?.maksimum || 21,
    },
    {
      label: "Stres",
      kategori: stressScore?.kategori || "-",
      skor: stressScore?.skor || 0,
      maksimum: stressScore?.maksimum || 21,
    },
  ];

  return (
    <div className="py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Hasil Evaluasi Kesehatan Mental
        </h1>

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

        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Berita Terkait
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
          {berita?.map((item, i) => (
            <CardNews
              title={item.title || "Judul tidak tersedia"}
              desc={item.description || "Deskripsi tidak tersedia"}
              author={item.author || item.source?.name || "Tidak diketahui"}
              onClick={() => window.open(item.url, "_blank")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}