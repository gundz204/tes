import { FaCamera, FaChevronDown } from "react-icons/fa";
import { createProfilPresenter } from "./profilPresenter";
import React, { useEffect, useState, useMemo } from "react";
import LoadingModal from "../../components/LoadingModal"
import SuccessModal from "../../components/SuccessModal"

export default function ProfileView() {
  const hasPhoto = true;
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    birthDate: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [successModal, setSuccessModal] = useState(false)

  // Buat presenter sekali saja
  const presenter = useMemo(() => createProfilPresenter({
    onLoadStart: () => {
      setLoading(true);
      setError("");
    },
    onLoadSuccess: (data) => {
      setLoading(false);
      setProfile({
        name: data.name || "",
        email: data.email || "",
        birth: data.birth ? data.birth.split("T")[0] : "",
        gender: data.gender || "",
      });
      setHasPhoto(!!data.photoUrl);
    },
    onLoadError: (msg) => {
      setLoading(false);
      setError(msg);
    },
    onUpdateSuccess: (data) => {
      setLoading(false);
      setSuccessMsg("Profil berhasil diperbarui");
      setError("");
    },
    onUpdateError: (msg) => {
      setLoading(false);
      setError(msg);
    },
  }), []);

  useEffect(() => {
    presenter.loadUser();
  }, [presenter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    setError("");
    setLoading(true);

    try {
      await presenter.updateUser(profile);
      setSuccessModal(true)
    } catch (err) {
      setError("Terjadi kesalahan saat memperbarui profil.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="flex justify-center px-4 py-8">
      {loading && <LoadingModal />}
      {successModal && <SuccessModal message="data berhasil diperbaharui"/>}
      <div className="w-full max-w-md bg-secondary p-6 rounded-xl shadow-md my-3">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24">
            {hasPhoto ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={
                    profile.gender === "male"
                      ? "https://avatar.iran.liara.run/public/47"
                      : profile.gender === "female"
                        ? "https://avatar.iran.liara.run/public/48"
                        : "https://avatar.iran.liara.run/public/47"
                  }
                  alt="Profile"
                  className="absolute inset-0 w-24 h-24 object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-xs px-3 text-center leading-tight">
                Belum ada foto
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 text-sm md:text-base text-black" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Nama Pengguna
            </label>
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama pengguna"
              value={profile.name}
              onChange={handleChange}
              className="w-full text-black bg-white border border-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-2 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={profile.email}
              onChange={handleChange}
              className="w-full text-black bg-white border border-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-2 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Tanggal Lahir
            </label>
            <input
              type="date"
              name="date"
              value={profile.birth}
              onChange={handleChange}
              className="w-full text-black bg-white border border-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Jenis Kelamin
            </label>
            <div className="relative">
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full text-black bg-white border border-accent focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-2 appearance-none"
                style={{ color: "black" }}
              >
                <option value="" disabled hidden style={{ color: "gray" }}>
                  Pilih jenis kelamin
                </option>
                <option style={{ color: "black" }}>Perempuan</option>
                <option style={{ color: "black" }}>Laki-laki</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10 justify-end">
            <button
              type="button"
              className="bg-white text-accent border border-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-colors"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-md border border-accent hover:bg-green-800 hover:text-white transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
