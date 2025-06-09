import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function IntroEvaluasiView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-10 pb-12">
      <div className="max-w-7xl w-full">
        {/* Judul */}
        <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
          Gunakan Sehati untuk Menilai Kesehatan Mental Anda
        </h1>
        <hr className="border-t border-gray-300 my-6 w-full" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Gambar */}
          <div className="flex justify-center">
            <img
              src="/images/ilustrasi_sehati.png"
              alt="Mental Health"
              className="w-full max-w-md h-full"
            />
          </div>

          {/* Konten Kanan */}
          <div
            style={{ color: "#374151" }}
            className="w-full flex flex-col justify-start space-y-6 text-sm md:text-base leading-relaxed"
          >
            <p className="text-justify">
              Sehati memanfaatkan{" "}
              <strong>
                Depression, Anxiety, and Stress Scale–21 items (DASS–21)
              </strong>
              , sebuah instrumen penilaian singkat yang terdiri dari 21
              pernyataan, untuk membantu Anda mengidentifikasi tingkat risiko
              terhadap gejala depresi, kecemasan, dan stres. Meskipun DASS-21
              memberikan indikasi awal mengenai kondisi psikologis Anda, alat
              ini tidak ditujukan untuk mendiagnosis gangguan mental secara
              klinis. Untuk memperoleh pemahaman dan penanganan yang lebih
              tepat, sangat disarankan agar hasil penilaian Anda dikonsultasikan
              dengan tenaga profesional di bidang kesehatan mental.
            </p>

            {/* Fitur Box */}
            <div className="flex gap-4 flex-wrap">
              {/* Box 1 */}
              <div className="flex-1 min-w-[100px] h-24 border border-accent rounded-lg px-4 md:py-6 py-3 text-center">
                <p className="text-2xl font-extrabold text-gray-900">21</p>
                <p className="text-sm font-bold text-gray-700">Pertanyaan</p>
              </div>

              {/* Box 2 */}
              <div className="flex-1 min-w-[140px] border border-accent rounded-lg px-4 py-3 text-center">
                <div className="flex justify-center py-2 gap-3 mb-1">
                  <span className="w-8 h-8 rounded-full border border-gray-500 bg-accent text-white text-xs flex items-center justify-center font-bold">
                    <FaCheck size={14} />
                  </span>
                  <span className="w-8 h-8 rounded-full border border-gray-500"></span>
                  <span className="w-8 h-8 rounded-full border border-gray-500"></span>
                </div>
                <p className="text-sm font-bold text-gray-700">Pilihan Ganda</p>
              </div>

              {/* Box 3 */}
              <div className="flex-1 min-w-[120px] border border-accent rounded-lg px-4 py-3 text-center">
                <p className="text-sm font-bold text-gray-900">Kurang dari</p>
                <p className="text-2xl font-extrabold text-gray-700">5</p>
                <p className="text-sm font-bold text-gray-700">Menit</p>
              </div>
            </div>

            {/* Tombol Mulai */}
            <button
              onClick={() => navigate("/evaluasi-diri")}
              className="mt-4 bg-accent hover:bg-accent text-white px-6 py-3 rounded-md text-sm font-semibold w-full md:w-auto transition"
            >
              Mulai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
