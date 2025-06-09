import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DepressionStep from "./components/DepressionStep";
import AnxietyStep from "./components/AnxietyStep";
import StressStep from "./components/StressStep";
import FeelingsStep from "./components/FeelingsStep";
import HasilTes from "./components/HasilTes";

export default function EvaluasiDiriView() {
  const [step, setStep] = useState(1);

  const [depressionAnswers, setDepressionAnswers] = useState(Array(7).fill(""));
  const [anxietyAnswers, setAnxietyAnswers] = useState(Array(7).fill(""));
  const [stressAnswers, setStressAnswers] = useState(Array(7).fill(""));
  const [feelingsAnswer, setFeelingsAnswer] = useState("");

  const handleDepressionChange = (index, value) => {
    const updated = [...depressionAnswers];
    updated[index] = value;
    setDepressionAnswers(updated);
  };

  const handleAnxietyChange = (index, value) => {
    const updated = [...anxietyAnswers];
    updated[index] = value;
    setAnxietyAnswers(updated);
  };

  const handleStressChange = (index, value) => {
    const updated = [...stressAnswers];
    updated[index] = value;
    setStressAnswers(updated);
  };

  const handleFeelingsChange = (value) => {
    setFeelingsAnswer(value);
  };

  const calculateScore = (answers) =>
    answers.reduce((total, val) => total + (parseInt(val) || 0), 0);

  const depressionScore = calculateScore(depressionAnswers);
  const anxietyScore = calculateScore(anxietyAnswers);
  const stressScore = calculateScore(stressAnswers);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return depressionAnswers.every((a) => a !== "");
      case 2:
        return anxietyAnswers.every((a) => a !== "");
      case 3:
        return stressAnswers.every((a) => a !== "");
      case 4:
        return true; // opsional
      default:
        return true;
    }
  };

  return (
    <div className="evaluasi-diri w-full min-h-screen bg-gray-50 flex flex-col justify-between">
      {step === 1 && (
        <DepressionStep
          answers={depressionAnswers}
          onAnswerChange={handleDepressionChange}
        />
      )}
      {step === 2 && (
        <AnxietyStep
          answers={anxietyAnswers}
          onAnswerChange={handleAnxietyChange}
        />
      )}
      {step === 3 && (
        <StressStep
          answers={stressAnswers}
          onAnswerChange={handleStressChange}
        />
      )}
      {step === 4 && (
        <FeelingsStep
          answer={feelingsAnswer}
          onAnswerChange={handleFeelingsChange}
        />
      )}
      {step === 5 && (
        <HasilTes
          depressionScore={depressionScore}
          anxietyScore={anxietyScore}
          stressScore={stressScore}
          feelingsAnswer={feelingsAnswer}
        />
      )}

      {/* Tombol Navigasi */}
      {step >= 1 && step <= 4 && (
        <div className="mt-10 mb-20 flex justify-center items-center md:gap-60 gap-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 bg-accent hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              <FaArrowLeft />
              Sebelumnya
            </button>
          )}

          {step < 4 && (
            <button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition ${
                isStepComplete()
                  ? "bg-accent hover:bg-green-800 text-white"
                  : "bg-green-300 cursor-not-allowed text-white"
              }`}
            >
              Selanjutnya
              <FaArrowRight />
            </button>
          )}

          {step === 4 && (
            <button
              onClick={() => setStep(5)}
              className="flex items-center gap-2 bg-accent hover:bg-green-800 text-white md:px-6 px-1 py-2 rounded-full font-semibold transition"
            >
              Selesai
              <FaArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
