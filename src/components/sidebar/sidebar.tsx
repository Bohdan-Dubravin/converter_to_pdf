import formatDateTime from "../../utils/fTime";
import usePdfContext from "../../utils/hooks/usePdf";

const Sidebar = () => {
  const { pdfList, setPdfToPreview } = usePdfContext();

  return (
    <div className="w-[350px] border-r border-gray-300  shadow-right-shadow">
      <ul>
        <li className="px-2 py-2 text-center text-md font-semibold uppercase">My documents</li>
        {pdfList.length ? (
          pdfList.map((pdf) => (
            <li
              className="flex items-center justify-between py-2 px-2 cursor-pointer border-b hover:bg-zinc-300 transition-colors duration-300"
              key={pdf.id}
              onClick={() => setPdfToPreview(pdf.file)}
            >
              <p className="text-md font-semibold">{pdf.title}</p>
              <span className="font-bold text-xs text-zinc-700">{formatDateTime(pdf.createdDate)}</span>
            </li>
          ))
        ) : (
          <li className="px-2 py-2 text-center text-md font-semibold text-zinc-700">List is empty</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
