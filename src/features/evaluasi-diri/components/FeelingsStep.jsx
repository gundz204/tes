import { useState } from "react";

export default function FeelingsStep({ onPrev, onFinish }) {
  const [feedback, setFeedback] = useState("");

  const handleFinish = () => {
    onFinish(feedback);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-accent py-5">
        <h2 className="text-center text-white text-xl font-semibold">
          Ungkapkan Perasaan Anda
        </h2>
      </div>

      <form className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        <div>
          <p className="text-center font-medium mb-2">
            Anda dapat menuliskan lebih detail tentang apa yang Anda rasakan
            saat ini.
          </p>
          <p className="text-center font-medium mb-2">
            Ini dapat membantu memberikan hasil analisis yang lebih akurat.
          </p>

          <div className="flex justify-center">
            <textarea
             className="w-full max-w-screen-md mt-4 h-60 p-4 rounded-xl border border-gray-300 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#426B1F]"
              placeholder="Contoh: Saya merasa sulit tidur akhir-akhir ini karena dapat revisi submission terus"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
}
