import usePdfContext from "../../utils/hooks/usePdf";

const Header = () => {
  const { setPdfToPreview } = usePdfContext();

  return (
    <header className="border-b border-gray-400 py-4 flex justify-between items-center px-2 shadow-bottom-shadow">
      <h1 className="text-rose-500 uppercase font-bold text-3xl ">Pdf creator</h1>
      <button
        className="block bg-rose-500 hover:bg-rose-600 py-2 px-4 font-bold text-xl rounded-md text-white transition-colors duration-300"
        onClick={() => setPdfToPreview(null)}
      >
        New Pdf
      </button>
    </header>
  );
};

export default Header;
