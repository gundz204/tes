import { useEffect, useState } from "react";

export default function SuccessModal({ message = "Success!", onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);

    setTimeout(() => {
      onClose && onClose();
      window.location.reload();
    }, 300);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center z-99 pointer-events-auto"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",

        transitionProperty: "opacity",
        transitionDuration: "300ms",
        transitionTimingFunction: show
          ? "cubic-bezier(0.4, 0, 1, 1)"
          : "cubic-bezier(0, 0, 0.2, 1)",
        opacity: show ? 1 : 0,
      }}
    >
      <div
        onClick={handleModalClick}
        className={`relative bg-white rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center gap-6 pointer-events-auto`}
        style={{
          transitionProperty: "opacity, transform",
          transitionDuration: "300ms",
          transitionTimingFunction: show
            ? "cubic-bezier(0.4, 0, 1, 1)"
            : "cubic-bezier(0, 0, 0.2, 1)",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-green-500 rounded-full p-5 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-green-700 text-xl font-semibold text-center select-none">{message}</p>
      </div>
    </div>
  );
}
