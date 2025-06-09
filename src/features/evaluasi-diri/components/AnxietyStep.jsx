export default function AnxietyStep({ answers, onAnswerChange }) {
  const anxietyQuestions = [
    "Saya merasa gugup, cemas, atau tegang.",
    "Saya tidak bisa berhenti atau mengendalikan kekhawatiran saya.",
    "Saya khawatir tentang berbagai hal.",
    "Saya merasa gelisah seperti ada sesuatu yang buruk akan terjadi.",
    "Saya mengalami kesulitan untuk rileks.",
    "Saya mudah tersinggung atau marah.",
    "Saya merasa takut tanpa alasan jelas.",
  ];

  const getRadioSize = (index) => {
    switch (index) {
      case 0:
      case 3:
        return "w-10 h-10 md:w-12 md:h-12";
      case 1:
      case 2:
        return "w-8 h-8 md:w-9 md:h-9";
      default:
        return "w-4 h-4";
    }
  };

  const getColor = (value) => {
    return value < 2
      ? "border-blue-500 hover:bg-blue-100 checked:bg-blue-500"
      : "border-red-500 hover:bg-red-100 checked:bg-red-500";
  };

  return (
    <>
      <div className="bg-accent py-5">
        <h2 className="text-center text-white text-xl font-semibold">
          Tes Kecemasan
        </h2>
      </div>

      <form className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {anxietyQuestions.map((question, index) => (
          <div key={index}>
            <p className="text-center font-medium md:mb-8 mb-6">{question}</p>

            <div className="flex flex-col md:flex-row items-center md:w-xl mx-auto justify-center gap-2 md:gap-6 relative mb-4">
              <div className="flex items-center justify-center gap-4 md:gap-10 w-full">
                {[0, 1, 2, 3].map((val) => (
                  <label
                    key={val}
                    className={`rounded-full border-2 flex items-center justify-center cursor-pointer transition duration-40
              ${getRadioSize(val)} ${getColor(val)}
              ${
                answers[index] === val.toString()
                  ? val < 2
                    ? "bg-blue-500 border-blue-500"
                    : "bg-red-500 border-red-500"
                  : ""
              }
            `}
                  >
                    <input
                      type="radio"
                      name={`anxiety-${index}`}
                      value={val}
                      checked={answers[index] === val.toString()}
                      onChange={() => onAnswerChange(index, val.toString())}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>

              {/* Desktop Labels */}
              <span className="hidden md:block absolute left-0 text-sm text-gray-600">
                Setuju
              </span>
              <span className="hidden md:block absolute right-0 text-sm text-gray-600">
                Tidak Setuju
              </span>

              {/* Mobile Labels */}
              <div className="flex justify-between w-full md:hidden px-12 text-sm text-gray-600">
                <span>Setuju</span>
                <span>Tidak Setuju</span>
              </div>
            </div>

            <hr className="border-t border-gray-300" />
          </div>
        ))}
      </form>
    </>
  );
}
