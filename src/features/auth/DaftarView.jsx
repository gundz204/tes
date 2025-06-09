import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "./daftarPresenter";
import LoadingModal from "../../components/LoadingModal";

const DaftarView = ({ onClose, handleMasuk }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birth: "",
    gender: "laki-laki",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { success, error } = await handleRegister(formData);
    if (success) {
      setLoading(false);
      alert("Registrasi berhasil! Silakan masuk.");
      handleMasuk()
    } else {
      setLoading(false);
      alert(`Gagal registrasi: ${error}`);
    }
  };

  return (
    <>
      {loading && <LoadingModal />} 
      <div className="fixed inset-0  z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[440px] text-sm relative">
          {/* Kiri - Ajakan Masuk */}
          <div className="w-full md:w-1/2 bg-gradient-to-b from-accent to-primary text-white p-4 sm:p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-xl font-bold mb-2">Selamat Datang Kembali!</h2>
            <p className="text-xs mb-4">
              Untuk dapat menggunakan <br className="hidden sm:block" />
              layanan kami kembali, <br className="hidden sm:block" />
              silahkan masuk dengan akun anda
            </p>
            <button className="border border-white px-4 py-1.5 rounded-full font-semibold hover:bg-white hover:text-green-700 transition text-sm" onClick={handleMasuk}>
              Masuk
            </button>
          </div>

          {/* Kanan - Form Registrasi */}
          <div className="w-full md:w-1/2 bg-[#f0fefb] p-4 sm:p-6 flex flex-col justify-center items-center">
            <img
              src="../../../public/images/SEHATI.png"
              alt="SEHATI"
              className="w-12 mb-2"
            />
            <h2 className="text-xl font-bold mb-4 text-center">Daftar</h2>
            <form className="w-full max-w-xs space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs mb-1">Nama Pengguna</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 bg-transparent outline-none py-1.5"
                  placeholder="Nama Pengguna"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 bg-transparent outline-none py-1.5"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Kata Sandi</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 bg-transparent outline-none py-1.5"
                  placeholder="Kata Sandi"
                  required
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  name="birth"
                  value={formData.birth}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 bg-transparent outline-none py-1.5"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Jenis kelamin
                </label>
                <div className="space-y-1 text-xs pl-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "Laki-laki"}
                      onChange={handleChange}
                    />
                    <span>Laki-laki</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />
                    <span>Perempuan</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white rounded-full py-1.5 font-semibold hover:bg-green-800 transition text-sm"
              >
                Daftar
              </button>
            </form>
          </div>
          {/* Tombol Close */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 border border-green-700 text-green-700 rounded-full bg-white/50 md:bg-green-100/40 md:hover:bg-green-100/60 flex items-center justify-center transition z-50"
            aria-label="Tutup modal daftar"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default DaftarView;
