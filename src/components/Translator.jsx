import { useState } from "react";

const Translator = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://google-translator9.p.rapidapi.com/v2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "5edf83d470msh9ca2a1b847ded94p1d82dejsn14241df4b89c",
            "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
          },
          body: JSON.stringify({
            q: text,
            target: language,
            source: "en",
          }),
        }
      );

      const data = await response.json();

      if (data?.data?.translations) {
        setTranslated(data.data.translations[0].translatedText);
      } else {
        setTranslated("Translation failed");
      }
    } catch (error) {
      console.error(error);
      setTranslated("Error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Text Translator
        </h1>

        {/* Input */}
        <textarea
          className="w-full mt-1 mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Type something in English..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Language */}
        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>

        {/* Button */}
        <button
          onClick={translateText}
          disabled={!text || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {/* Output */}
        <div className="mt-5">
          <div className="p-3 border rounded bg-gray-50 min-h-[60px]">
            {translated || "Your translation will appear here..."}
          </div>

          {/* Copy Button */}
          {translated && (
            <button
              onClick={() => navigator.clipboard.writeText(translated)}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Copy
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Translator;