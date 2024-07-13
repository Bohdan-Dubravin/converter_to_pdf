import { pdfjs } from "react-pdf";
import { PdfProvider } from "./providers/PdfProvider";

import Header from "./components/header/Header";
import MainView from "./view/main-view";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  return (
    <PdfProvider>
      <Header />
      <MainView />
    </PdfProvider>
  );
}

export default App;
