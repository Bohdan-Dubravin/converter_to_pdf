import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Loader from "./components/loader";

interface Props {
  pdf: ArrayBuffer;
}

const PdfViewer = ({ pdf }: Props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, [pdf]);

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  return (
    <div>
      {pdf ? (
        <Document
          className={!loading ? "shadow-xl border" : ""}
          file={pdf}
          loading={<Loader />}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(e) => console.log(e)}
        >
          <Page pageNumber={1} />
        </Document>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PdfViewer;
