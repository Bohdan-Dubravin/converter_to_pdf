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
      <header className="border-b border-gray-300 py-4">
        header
        <button
          className="block bg-rose-500 hover:bg-rose-600 py-2 px-4 font-bold text-xl rounded-md text-white transition-colors duration-300"
          onClick={() => setPdfToPreview(null)}
        >
          new pdf
        </button>
      </header>
      <div className="flex h-screen">
        <Sidebar setPdfPreview={setPdfToPreview} pdfList={pdfList} />
        <div className="p-2 flex items-center justify-center h-full w-full ">
          {pdfToPreview ? (
            <PdfPreview pdf={pdfToPreview} />
          ) : (
            <div>
              <textarea
                className="border resize-none w-[400px] h-[200px]"
                value={text}
                onChange={changeText}
              ></textarea>
              <button
                className="block bg-rose-500 hover:bg-rose-600 py-2 px-4 font-bold text-xl rounded-md text-white transition-colors duration-300"
                onClick={handleClick}
              >
                createPdf
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
