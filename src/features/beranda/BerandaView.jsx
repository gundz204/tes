import React, { useState, useEffect } from "react";
import MasukView from "../auth/MasukView";
import DaftarView from "../auth/DaftarView";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal"

const BerandaView = () => {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate()
  const location = useLocation();
  const openMasuk = () => setModal("masuk");
  const openDaftar = () => setModal("daftar");
  const closeModal = () => setModal(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowSuccess(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      {showSuccess && (
        <SuccessModal
          message="Login berhasil!"
          onClose={() => setShowSuccess(false)}
        />
      )}
      <main className="flex flex-col items-center gap-10 px-6 py-10 sm:px-10 md:px-14 max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <section className="bg-secondary w-full p-8 rounded-2xl shadow-md flex flex-col-reverse items-center gap-8 lg:gap-14 md:flex-row md:justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold leading-snug mb-4">
              Ketahui{" "}
              <span className="text-green-600">
                kondisi <br className="hidden sm:block" />
                mental Anda
              </span>{" "}
              saat ini <br className="hidden sm:block" />
              dengan Tes SEHATI
            </h1>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Cek kesehatan mental Anda dengan cepat dan aman. Jawab 21
              pertanyaan dan temukan tingkat stres, kecemasan, serta depresi –
              lengkap dengan hasil instan sebagai panduan pertolakan diri.
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center md:justify-start gap-4">
                <button
                  onClick={openMasuk}
                  className="bg-accent text-white py-2 px-6 rounded-xl text-base hover:bg-green-700 transition"
                >
                  Masuk
                </button>
                <button
                  onClick={openDaftar}
                  className="border border-green-700 text-green-700 py-2 px-6 rounded-xl text-base hover:bg-green-100 transition"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/Ilustrasi.png"
              alt="Mental Health Hero"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
            />
          </div>
        </section>

        {/* Apa yang Perlu Diketahui */}
        <section className="w-full text-center">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-6">
            Apa yang Perlu Anda Ketahui Sebelum Tes?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                img: "Penilaian.png",
                title: "Tentang Penilaian",
                desc: "SEHATI menggunakan DASS-21 untuk mengukur tingkat stres, kecemasan, dan depresi melalui 21 pertanyaan pada skala 0–3.",
              },
              {
                img: "Peringatan.png",
                title: "Peringatan Medis",
                desc: "Hasil evaluasi ini bukan diagnosis medis. Jika Anda mengalami gangguan mental serius, hubungi tenaga profesional.",
              },
              {
                img: "Privasi.png",
                title: "Privasi",
                desc: "Data Anda bersifat anonim dan tidak disimpan. Digunakan hanya untuk hasil evaluasi secara lokal.",
              },
            ].map(({ img, title, desc }) => (
              <div key={title} className="bg-background p-6 rounded-xl shadow">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={`/images/LogoBeranda/${img}`}
                    alt={title}
                    className="w-6 h-6 object-contain"
                  />
                  <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Manfaat SEHATI */}
        <section className="bg-primary rounded-2xl px-6 py-10 mt-12 shadow-md w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-4">
            Manfaat SEHATI
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-base">
            Empat manfaat utama dari tes SEHATI untuk menjaga kesehatan mental
            Anda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                img: "Otak.png",
                title: "Kenali Kondisi Mental",
                desc: "Tes ini membantu ukur stres, kecemasan, dan depresi.",
              },
              {
                img: "Hati.png",
                title: "Lebih Memahami Diri",
                desc: "Pahami emosi dan hal yang memicunya.",
              },
              {
                img: "Statistik.png",
                title: "Ambil Tindakan",
                desc: "Panduan langkah untuk perubahan positif. Mulai perbaikan dari sini.",
              },
              {
                img: "Privasi.png",
                title: "Privasi Terjaga",
                desc: "Jawaban dan hasil tes ini bersifat pribadi.",
              },
            ].map(({ img, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
              >
                <img
                  src={`/images/LogoManfaat/${img}`}
                  alt={title}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluasi Machine Learning */}
        <section className="text-center w-full mt-10">
          <div className="flex items-start justify-center gap-4 mb-4">
            <img
              src="/images/LogoBeranda/Lup.png"
              alt="Ikon Evaluasi"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 text-left">
              Evaluasi <span className="text-green-600">Kesehatan Mental</span>{" "}
              berbasis <span className="text-green-400">Machine Learning</span>
            </h2>
          </div>
          <p className="text-base text-black mb-5">
            Tingkatkan kesadaran dan perhatian pada kesehatan mental
            <br className="hidden sm:inline" />
            kapan saja, di mana saja.
          </p>

          <button
            onClick={() => navigate("/intro-evaluasi")}
            className="bg-accent text-white py-2 px-6 rounded-xl hover:bg-green-700 transition text-base"
          >
            Mulai Evaluasi Diri Sekarang
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Gratis, rahasia, dan hasil langsung keluar!
          </p>
        </section>
      </main>

      {/* Modal Overlay */}
      {(modal === "masuk" || modal === "daftar") && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50"
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {modal === "masuk" && (
              <MasukView onClose={closeModal} handleDaftar={openDaftar} />
            )}
            {modal === "daftar" && (
              <DaftarView onClose={closeModal} handleMasuk={openMasuk} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BerandaView;
