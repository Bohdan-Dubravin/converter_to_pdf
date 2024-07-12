import React, { useEffect, useRef } from "react";
import pdfjs from "pdfjs-dist/legacy/build/pdf";

// Initialize PDF.js worker for PDF rendering
if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const PDFViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      const loadingTask = pdfjs.getDocument(pdfUrl);

      try {
        const pdfDocument = await loadingTask.promise;
        const page = await pdfDocument.getPage(1); // Get the first page

        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Prepare canvas using PDF page dimensions
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext);
      } catch (error) {
        console.error("Error occurred while rendering PDF:", error);
      }
    };

    renderPDF();
  }, [pdfUrl]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PDFViewer;
