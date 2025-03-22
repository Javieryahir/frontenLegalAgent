import { useState } from "react";

function App() {

  const [query, setQuery] = useState<string>("");

  const [response, setResponse] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!query) return;

    setLoading(true);

    try {

      const res = await fetch(
        `https://ps2vm7weia.execute-api.us-east-2.amazonaws.com/chat?query=${encodeURIComponent(query)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (res.ok) {
        const data = await res.json();

        const parsedBody = JSON.parse(data.body);

        const secondResult = parsedBody.result.result;

        console.log(secondResult);

        setResponse(JSON.stringify(secondResult, null, 2));
      } else {
        setResponse("Error en la respuesta del servidor.");
      }
    } catch (error) {
      console.error(error);
      setResponse("Error al hacer la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg sm:max-w-md md:max-w-xl p-4">

        <div className="bg-white shadow-lg rounded-lg p-8 m-4">
          <h2 className="text-center text-2xl font-semibold mb-6">Respuesta</h2>
          <div className="flex justify-center">
            {loading ? (
              <div className="flex justify-center">
                <img
                  src="https://cdn.pixabay.com/animation/2023/11/09/03/05/03-05-45-320_512.gif"
                  alt="Cargando..."
                  className="w-10 h-10"
                />
              </div>
            ) : (
              <div className="overflow-auto max-h-96">
                <pre>{response}</pre>
              </div>
            )}
          </div>
        </div>


        <div className="bg-white shadow-lg rounded-lg p-8 m-4">
          <h2 className="text-center text-2xl font-semibold mb-6">Formulario</h2>
          <div className="flex justify-center mb-4">
            <textarea
              className="border-2 border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe algo..."
              rows={5}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white rounded-lg px-6 py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

