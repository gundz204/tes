export default function DepressionStep({ answers, onAnswerChange }) {
  const depressionQuestions = [
    "Saya sama sekali tidak dapat merasakan perasaan positif (contoh: merasa gembira, bangga, dsb).",
    "Saya merasa sulit berinisiatif melakukan sesuatu.",
    "Saya merasa tidak ada lagi yang bisa saya harapkan.",
    "Saya merasa sedih dan tertekan.",
    "Saya tidak bisa merasa antusias terhadap hal apapun.",
    "Saya merasa diri saya tidak berharga.",
    "Saya merasa hidup ini tidak berarti.",
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
      ? "border-red-500 hover:bg-red-100" 
      : "border-blue-500 hover:bg-blue-100";
  };

  return (
    <>
      <div className="bg-accent py-5">
        <h2 className="text-center text-white text-xl font-semibold">
          Tes Depresi
        </h2>
      </div>

      <form className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {depressionQuestions.map((question, index) => (
          <div key={index}>
            <p className="text-center font-medium md:mb-8 mb-6">{question}</p>

            <div className="flex flex-col md:flex-row items-center md:w-xl mx-auto justify-center gap-2 md:gap-6 relative mb-4">
              {/* Radio Buttons */}
              <div className="flex items-center justify-center gap-4 md:gap-10 w-full">
                {[0, 1, 2, 3].map((val) => {
                  const isSelected = answers[index] === val.toString();
                  const selectedColor =
                    val < 2
                      ? "bg-red-500 border-red-500 text-white" 
                      : "bg-blue-500 border-blue-500 text-white";

                  return (
                    <label
                      key={val}
                      className={`rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-40
                        ${getRadioSize(val)} ${getColor(val)} 
                        ${isSelected ? selectedColor : "bg-white"}
                      `}
                    >
                      <input
                        type="radio"
                        name={`depression-${index}`}
                        value={val}
                        checked={isSelected}
                        onChange={() => onAnswerChange(index, val.toString())}
                        className="sr-only"
                      />
                    </label>
                  );
                })}
              </div>

              {/* Desktop Labels */}
              <span className="hidden md:block absolute left-0 text-sm text-gray-600">
                Tidak Setuju
              </span>
              <span className="hidden md:block absolute right-0 text-sm text-gray-600">
                Setuju
              </span>

              {/* Mobile Labels */}
              <div className="flex justify-between w-full md:hidden px-12 text-sm text-gray-600">
                <span>Tidak Setuju</span>
                <span>Setuju</span>
              </div>
            </div>

            <hr className="border-t border-gray-300" />
          </div>
        ))}
      </form>
    </>
  );
}
