import { useState } from "react";
import { Sidebar } from "./components/sidebar";

import PdfPreview from "./pdf-preview";
import { pdfjs } from "react-pdf";
import usePdf from "./utils/hooks/usePdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const [text, setText] = useState("");
  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const { pdfToPreview, pdfList, setPdfToPreview, createPdf } = usePdf();

  const handleClick = () => {
    if (text.trim()) {
      createPdf(text);
      setText("");
    }
  };

  return (
    <>
      <header className="border-b border-gray-400 py-4 flex justify-between items-center px-2 shadow-bottom-shadow">
        <h1 className="text-rose-500 uppercase font-bold text-3xl ">Pdf creator</h1>
        <button
          className="block bg-rose-500 hover:bg-rose-600 py-2 px-4 font-bold text-xl rounded-md text-white transition-colors duration-300"
          onClick={() => setPdfToPreview(null)}
        >
          New Pdf
        </button>
      </header>
      <main className="flex main">
        <Sidebar setPdfPreview={setPdfToPreview} pdfList={pdfList} />
        <div className="p-2 flex items-center justify-center h-full w-full">
          {pdfToPreview ? (
            <PdfPreview pdf={pdfToPreview} />
          ) : (
            <div>
              <textarea
                className=" resize-none w-[800px] h-[600px] outline-none border border-zinc-500 rounded p-2"
                placeholder="Write your text here"
                value={text}
                onChange={changeText}
              ></textarea>
              <button
                className="block bg-rose-500 hover:bg-rose-600 py-2 px-4 font-bold mt-4 text-xl rounded-md text-white ml-auto transition-colors duration-300"
                onClick={handleClick}
              >
                Create Pdf
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
