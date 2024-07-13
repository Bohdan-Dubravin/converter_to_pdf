import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PdfViewer from "./pdf-preview";

jest.mock("react-pdf", () => ({
  Document: jest.fn(({ onLoadSuccess, children }) => {
    setTimeout(() => {
      if (onLoadSuccess) onLoadSuccess();
    }, 0);
    return <div>{children}</div>;
  }),
  Page: jest.fn(() => <div data-testid="pdf-page">Page 1</div>),
}));

jest.mock("../loader", () => () => <div data-testid="loader">Loading...</div>);

describe("PdfViewer", () => {
  const mockPdf = new ArrayBuffer(8);

  const renderPdfViewer = (pdf = mockPdf) => {
    render(<PdfViewer pdf={pdf} />);
  };

  it("should set loading to false on document load success", async () => {
    renderPdfViewer();
    await waitFor(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());
  });
});
