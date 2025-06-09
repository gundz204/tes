import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DetailBeritaView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data detail, nanti bisa diganti dengan API atau Presenter
  const beritaDetail = {
    id,
    title: "Lorem Ipsum Detail",
    author: "Unknown",
    publishedDate: "2025-06-06",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod elit luctus tempor feugiat. 
      Curabitur felis risus, aliquet in luctus nec, lacinia eget metus. Pellentesque habitant morbi tristique 
      senectus et netus et malesuada fames ac turpis egestas. 
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Donec sit amet malesuada justo. 
    `,
  };

  return (
    <main className="px-4 py-6 max-w-screen-md mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-1 text-sm text-green-700 hover:underline"
      >
        <FaArrowLeft className="w-4 h-4" />
        Kembali ke Berita
      </button>

      <article className="bg-white/20 border-accent border-t-4 backdrop-blur-md border rounded-2xl shadow-lg p-6 md:p-8 text-black transition-all duration-300">
        <h1 className="text-2xl font-bold mb-2">{beritaDetail.title}</h1>
        <p className="text-xs text-black/80 mb-4">
          Oleh {beritaDetail.author} &middot;{" "}
          {new Date(beritaDetail.publishedDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="whitespace-pre-line leading-relaxed text-sm text-black/90">
          {beritaDetail.content}
        </div>
      </article>
    </main>
  );
};

export default DetailBeritaView;
