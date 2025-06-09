import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// Import halaman
import BerandaView from "../features/beranda/BerandaView";
import NotFoundPage from "../features/not-found/NotFoundPage";
import MasukView from "../features/auth/MasukView";
import DaftarView from "../features/auth/DaftarView";
import RiwayatView from "../features/riwayat/RiwayatViews";
import DetailRiwayatViews from "../features/riwayat/DetailRiwayatViews";
import ProfilView from "../features/profil/ProfilView";
import EvaluasiDiriView from "../features/evaluasi-diri/EvaluasiDiriView";
import IntroEvaluasiView from "../features/evaluasi-diri/IntroEvaluasiView";
import BeritaViews from "../features/berita/BeritaViews";
import DetailBerita from "../features/berita/DetailBeritaView";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Silakan login terlebih dahulu");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BerandaView />} />
        <Route path="/beranda" element={<BerandaView />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/riwayat" element={<RiwayatView />} />
          <Route path="/riwayat/:id" element={<DetailRiwayatViews />} />
          <Route path="/detail-riwayat" element={<DetailRiwayatViews />} />
          <Route path="/profil" element={<ProfilView />} />
          <Route path="/evaluasi-diri" element={<EvaluasiDiriView />} />
          <Route path="/intro-evaluasi" element={<IntroEvaluasiView />} />
          <Route path="/berita" element={<BeritaViews />} />
          <Route path="/berita/:id" element={<DetailBerita />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
