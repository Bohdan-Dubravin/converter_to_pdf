import CreatePdfForm from "../components/create-pdf-form/create-pdf-form";
import { Sidebar } from "../components/sidebar";
import PdfPreview from "../pdf-preview";
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
