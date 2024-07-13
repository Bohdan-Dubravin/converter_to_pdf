import { CreatePdfForm } from "../components/create-pdf-form";
import { PdfPreview } from "../components/pdf-preview";
import { Sidebar } from "../components/sidebar";

import usePdfContext from "../utils/hooks/usePdf";

const MainView = () => {
  const { pdfToPreview } = usePdfContext();

  return (
    <main className="flex main">
      <Sidebar />
      <div className="p-2 flex items-center justify-center h-full w-full">
        {pdfToPreview ? <PdfPreview pdf={pdfToPreview} /> : <CreatePdfForm />}
      </div>
    </main>
  );
};

export default MainView;
