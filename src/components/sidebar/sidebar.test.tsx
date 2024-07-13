import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import formatDateTime from "../../utils/fTime";
import { PdfContext } from "../../providers/PdfProvider";
import Sidebar from "./sidebar";

jest.mock("../../utils/fTime", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedFormatDateTime = formatDateTime as jest.MockedFunction<typeof formatDateTime>;

describe("Sidebar", () => {
  const defaultPdfList = [
    { id: "1", title: "Document 1", createdDate: new Date("2023-07-10T00:00:00.000Z"), file: new ArrayBuffer(8) },
    { id: "2", title: "Document 2", createdDate: new Date("2023-07-10T00:00:00.000Z"), file: new ArrayBuffer(8) },
  ];

  const setPdfToPreview = jest.fn();

  const renderSidebar = (pdfList = defaultPdfList) => {
    render(
      <PdfContext.Provider value={{ pdfList, setPdfToPreview, pdfToPreview: null, createPdf: jest.fn() }}>
        <Sidebar />
      </PdfContext.Provider>
    );
  };

  beforeEach(() => {
    mockedFormatDateTime.mockImplementation((date) => `Formatted: ${date}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render list of PDFs", () => {
    renderSidebar();
    expect(screen.getByText("Document 1")).toBeInTheDocument();
    expect(screen.getByText("Document 2")).toBeInTheDocument();
  });

  it("should call setPdfToPreview when a PDF is clicked", () => {
    renderSidebar();
    fireEvent.click(screen.getByText("Document 1"));
    expect(setPdfToPreview).toHaveBeenCalledWith(defaultPdfList[0].file);
  });

  it('should display "List is empty" when there are no PDFs', () => {
    renderSidebar([]);
    expect(screen.getByText("List is empty")).toBeInTheDocument();
  });
});
