import { PDFDocument } from "pdf-lib";

export default async function convertRawPdfToReadableFormat(rawPdfData: any) {
  // Create a new PDFDocument instance
  const pdfDoc = await PDFDocument.load(rawPdfData);

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Convert bytes to a format (like base64) that can be used by react-pdf
  const pdfDataUri = `data:application/pdf;base64,${pdfBytes.toString()}`;

  return pdfDataUri;
}

// Usage example
