import { useEffect, useState } from "react";
import axios from "axios";
import { PDFEntry } from "../../types/pdf";
import PDFIndexedDB from "../db-manager";
const apikey = "78684310-850d-427a-8432-4a6487f6dbc4";

const usePdf = () => {
  const [pdfToPreview, setPdfToPreview] = useState<Blob | null>(null);
  const [pdfList, setPdfList] = useState<PDFEntry[]>([]);
  const pdfIndexedDb = new PDFIndexedDB();
  const getPdf = async () => {
    const pdfList = await pdfIndexedDb.getAllPDFs();
    setPdfList(pdfList);
  };
  useEffect(() => {
    getPdf();
  }, []);

  const createPdf = async (text: string) => {
    try {
      const response = await axios.post(
        `http://95.217.134.12:4010/create-pdf?apiKey=${apikey}`,
        { text },
        {
          responseType: "arraybuffer",
        }
      );

      await pdfIndexedDb.addPDF({ text, file: response.data });
      getPdf();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pdfToPreview,
    pdfList,
    setPdfToPreview,
    createPdf,
  };
};

export default usePdf;
