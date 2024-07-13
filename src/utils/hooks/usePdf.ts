import { useContext } from "react";
import { PdfContext } from "../../providers/PdfProvider";

const usePdfContext = () => {
  const context = useContext(PdfContext);

  if (!context) {
    throw new Error("usePdfContext must be used within a PdfProvider");
  }

  return context;
};

export default usePdfContext;
