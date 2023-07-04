import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetchJsonp(
        "https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?",
        { jsonpCallback: "jsonp" }
      )
        .then((res) => res.json())
        .then((data) => data);
      setQuote(response.quoteText);
      setAuthor(response.quoteAuthor);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setQuote("Ошибка запроса");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md mt-8">
      <div className="text-center mb-4">
        <p className="text-2xl font-bold">{quote}</p>
        <p className="text-gray-600 italic">-{author}</p>
      </div>
      <button
        onClick={fetchQuote}
        disabled={loading}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Загрузка..." : "Новая цитата"}
      </button>
    </div>
  );
};

export default Quote;
