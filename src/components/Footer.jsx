import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-background text-gray-800 py-4 px-4">
      <div className="max-w-screen-2xl mx-auto px-12 grid grid-cols-1 md:flex md:items-center md:justify-between gap-6">
        {/* Logo */}
        <div className="flex justify-center md:justify-start mb-0 md:w-1/3">
          <img
            src="/images/SEHATI.png"
            alt="Logo SEHATI"
            className="w-30 md:w-24 h-auto"
          />
        </div>

        {/* Layanan */}
        <div className="text-center md:text-left mb-0 md:flex-1 md:flex md:justify-center">
          <div className="lg:w-max md:w-max">
            <h3 className="font-semibold text-accent mb-2">Layanan</h3>
            <ul className="space-y-1 text-sm text-accent">
              <li>
                <Link
                  to={'/'}
                  className="hover:underline"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to={'/intro-evaluasi'}
                  className="hover:underline"
                >
                  Evaluasi Diri
                </Link>
              </li>
              <li>
                <Link
                  to={'/berita'}
                  className="hover:underline"
                >
                  Berita
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Hubungi Kami */}
        <div className="text-center md:text-right md:w-1/3 md:flex md:flex-col md:justify-center md:items-end">
          <div>
            <h3 className="font-semibold text-sm mb-2 text-accent">
              Hubungi Kami
            </h3>
            <div className="flex justify-center md:justify-end space-x-3.5 text-xl text-accent">
              <a href="mailto:example@email.com" aria-label="Email">
                <LuMail />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Garis pemisah dan copyright */}
      <div className="border-t border-accent mt-6 pt-2 text-center text-sm">
        <p className="mt-2 text-accent">© 2025 SEHATI. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
}
