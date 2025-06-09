import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "./loginPresenter";
import SEHATI_LOGO from "/images/SEHATI.png";
import LoadingModal from "../../components/LoadingModal"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MasukView = ({ onClose, handleDaftar }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    await handleLogin(
      { email, password },
      (result) => {
        console.log("Login berhasil", result);
        setEmail("");
        setPassword("");
        setLoading(false);
        onClose();
        toast.success("Login Berhasil", {
          autoClose: 2000,
          onClose: () => {
            navigate(0);
          },
        });
      },
      (errorMessage) => {
        toast.error("Login Gagal", errorMessage);
        setLoading(false);
      }
    );
  };

  return (
    <>
      {loading && <LoadingModal />}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[440px] text-sm">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 border border-green-700 text-green-700 rounded-full bg-green-100/40 hover:bg-green-100/60 flex items-center justify-center transition z-50"
            aria-label="Tutup modal login"
            type="button"
          >
            ✕
          </button>

          {/* Kiri - Form Login */}
          <div className="w-full md:w-1/2 backdrop-blur-sm p-4 sm:p-6 flex flex-col justify-center items-center">
            <img src={SEHATI_LOGO} alt="SEHATI" className="w-12 mb-2" />
            <h2 className="text-xl font-bold mb-4 text-center">Masuk</h2>
            <form className="w-full max-w-xs space-y-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-xs mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border-b border-gray-400 bg-transparent outline-none py-1.5"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs mb-1">
                  Kata Sandi
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full border-b border-gray-400 bg-transparent outline-none py-1.5"
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right text-[11px] mt-1">
                  <a href="#" className="text-gray-600 hover:underline">
                    Lupa kata sandi?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white rounded-full py-1.5 font-semibold hover:bg-green-800 transition text-sm"
              >
                Masuk
              </button>
            </form>
          </div>

          {/* Kanan - Ajakan Daftar */}
          <div className="w-full md:w-1/2 bg-gradient-to-b from-accent to-primary text-white p-4 sm:p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-xl font-bold mb-2">Halo, Teman SEHATI!</h2>
            <p className="text-xs mb-4">
              Daftarkan diri anda <br className="hidden sm:block" />
              dan mulai gunakan layanan kami
            </p>
            <button
              onClick={handleDaftar}
              className="border border-white px-4 py-1.5 rounded-full font-semibold hover:bg-white hover:text-green-700 transition text-sm"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasukView;
