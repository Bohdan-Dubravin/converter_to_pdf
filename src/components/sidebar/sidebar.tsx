import { useState, useEffect } from "react";
import PDFIndexedDB from "../../utils/db-manager";
import { PDFEntry } from "../../types/pdf";

interface Props {
  setPdfPreview: (pdf: Blob) => void;
}

const Sidebar = ({ setPdfPreview }: Props) => {
  const pdfIndexedDb = new PDFIndexedDB();
  const [pdfs, setPdfs] = useState<PDFEntry[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const allPdfs = await pdfIndexedDb.getAllPDFs();
      setPdfs(allPdfs);
    };
    fetchData();
  }, []);

  return (
    <div className="w-[200px] border-r border-gray-300">
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id} onClick={() => setPdfPreview(pdf.file)}>
            {pdf.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
