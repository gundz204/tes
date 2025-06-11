import { FaArrowRight } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export default function CardNews({ title, desc, author, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-md border border-green-700/40 cursor-pointer transition hover:shadow-sm w-full h-60"
    >
      <div className="h-[6px] bg-green-700 rounded-t-md" />
      <div className="px-5 py-4 mt-0 flex flex-col h-full">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{title.length > 10 ? `${title.slice(0, 15)}...` : title}</h3>
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <FaUser className="text-[10px]" />
          {author}
        </p>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed overflow-hidden line-clamp-3">
          {desc.length > 10 ? `${desc.slice(0, 50)}...` : desc}
        </p>
        <button className="inline-flex items-center bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-800 transition self-start mt-6">
          Selengkapnya
          <FaArrowRight className="text-xs ml-2" />
        </button>
      </div>
    </div>
  );
}

