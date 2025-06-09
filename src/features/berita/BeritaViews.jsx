import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchBerita } from "./beritaPresenter";
import LoadingModal from "../../components/LoadingModal";
import { useState, useEffect } from "react";

const BeritaViews = () => {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita(
      (response) => {
        setBeritaList(response.data);
        setLoading(false);
      },
      (error) => {
        setErrorMsg(error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <main className="px-6 md:px-14 py-6 max-w-screen-xl mx-auto">
      {loading && <LoadingModal />}
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Berita</h1>
      <hr className="border-t border-gray-300 mb-6" />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.map((berita) => (
          <article
            key={berita.id}
            className="bg-white border border-accent border-t-4 rounded-lg shadow-sm p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-1">{berita.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{berita.author}</p>
              <p className="text-sm text-gray-700">{berita.description}</p>
            </div>
            <div className="mt-4">
              <a
                href={berita.url}
                target="_blank"
                className="bg-accent text-white text-sm py-2 px-4 rounded-full hover:bg-green-600 transition inline-block"
              >
                Selengkapnya →
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default BeritaViews;
