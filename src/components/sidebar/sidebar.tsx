import { PDFEntry } from "../../types/pdf";
import formatDateTime from "../../utils/fTime";

interface Props {
  setPdfPreview: (pdf: Blob) => void;
  pdfList: PDFEntry[];
}

const Sidebar = ({ setPdfPreview, pdfList }: Props) => {
  return (
    <div className="w-[300px] border-r border-gray-300">
      <ul>
        {pdfList.map((pdf) => (
          <li
            className="flex items-center justify-between px-1 py-2 cursor-pointer border-b hover:bg-zinc-300 transition-colors duration-300"
            key={pdf.id}
            onClick={() => setPdfPreview(pdf.file)}
          >
            <p className="text-md font-semibold">{pdf.title}</p>
            <span className="font-bold text-xs text-zinc-700">{formatDateTime(pdf.createdDate)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
