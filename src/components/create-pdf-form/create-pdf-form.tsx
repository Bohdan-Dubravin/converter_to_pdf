import { useEffect, useState } from "react";
import usePdfContext from "../../utils/hooks/usePdf";

const CreatePdfForm = () => {
  const [text, setText] = useState("");
  const { createPdf } = usePdfContext();

  const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    createPdf(text);
    setText("");
  };

  useEffect(() => {
    setText("");
  }, []);

  return (
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
  );
};

export default CreatePdfForm;
