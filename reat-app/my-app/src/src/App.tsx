import axios from "axios";
import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import PDFIndexedDB from "./utils/db-manager";
import PdfPreview from "./pdf-preview";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
// Rest of code.
const apikey = "78684310-850d-427a-8432-4a6487f6dbc4";
function App() {
  const [text, setText] = useState("");
  const [pdftoPreview, setPdfToPreview] = useState<Blob | null>(null);
  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const pdfIndexedDb = new PDFIndexedDB();

  const createPdf = async () => {
    if (!text.trim()) return;
    try {
      const response = await axios.post(
        `http://95.217.134.12:4010/create-pdf?apiKey=${apikey}`,
        { text },
        {
          responseType: "arraybuffer",
        }
      );
      // const url = new Blob([response.data], { type: "application/pdf" });
      pdfIndexedDb.addPDF(response.data);

      // axios
      //   .post(
      //     `http://95.217.134.12:4010/create-pdf?apiKey=${apikey}`,
      //     { text },
      //     {
      //       responseType: "arraybuffer",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Accept: "application/pdf",
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     const url = new Blob([response.data], { type: "application/pdf" });
      //     pdfIndexedDb.addPDF(url);
      //   })
      //   .catch((error) => console.log(error));
      // const sampleArr = base64ToArrayBuffer(response.data);
      // fetchAndSavePDF("Sample Report", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="border-b border-gray-300 py-4">header</header>
      <div className="flex h-screen">
        <Sidebar setPdfPreview={setPdfToPreview} />
        <div className="p-2">
          <textarea className="border resize-none w-[400px] h-[200px]" value={text} onChange={changeText}></textarea>
          <button
            className="block bg-rose-500 hover:bg-rose-600 py-2 px-4 font-bold text-xl rounded-md text-white transition-colors duration-300"
            onClick={createPdf}
          >
            createPdf
          </button>
          {/* <PDFViewer pdfUrl={pdftoPreview} /> */}
          <PdfPreview pdf={pdftoPreview} />
        </div>
      </div>
    </>
  );
}

export default App;
