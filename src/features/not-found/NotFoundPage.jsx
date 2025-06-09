import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base text-accent px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-lg mb-6">Halaman tidak ditemukan.</p>
                <Link
                    to="/"
                    className="inline-block bg-accent text-white px-6 py-3 rounded-md text-sm font-semibold hover:brightness-110 transition"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
