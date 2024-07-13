import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { PDFEntry } from "../types/pdf";
import PDFIndexedDB from "../utils/db-manager";

const apikey = "78684310-850d-427a-8432-4a6487f6dbc4";

export interface PdfContextProps {
  pdfToPreview: ArrayBuffer | null;
  pdfList: PDFEntry[];
  setPdfToPreview: (pdf: ArrayBuffer | null) => void;
  createPdf: (text: string) => Promise<void>;
}

export const PdfContext = createContext<PdfContextProps | undefined>(undefined);

interface PdfProviderProps {
  children: ReactNode;
}

export const PdfProvider: React.FC<PdfProviderProps> = ({ children }) => {
  const [pdfToPreview, setPdfToPreview] = useState<ArrayBuffer | null>(null);
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

      setPdfToPreview(response.data);
      getPdf();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PdfContext.Provider value={{ pdfToPreview, pdfList, setPdfToPreview, createPdf }}>{children}</PdfContext.Provider>
  );
};
