import usePdfContext from "../utils/hooks/usePdf";
import CreatePdfForm from "../components/create-pdf-form/create-pdf-form";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("../../utils/hooks/usePdf");

describe("CreatePdfForm", () => {
  const mockCreatePdf = jest.fn();

  beforeEach(() => {
    (usePdfContext as jest.Mock).mockReturnValue({
      createPdf: mockCreatePdf,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("updates text area value", () => {
    render(<CreatePdfForm />);
    const textarea = screen.getByPlaceholderText("Write your text here");
    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    expect(textarea).toHaveValue("Hello, world!");
  });

  test("calls createPdf on button click", () => {
    render(<CreatePdfForm />);
    const textarea = screen.getByPlaceholderText("Write your text here");
    const button = screen.getByText("Create Pdf");

    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    fireEvent.click(button);

    expect(mockCreatePdf).toHaveBeenCalledWith("Hello, world!");
  });

  test("clears text area on button click", () => {
    render(<CreatePdfForm />);
    const textarea = screen.getByPlaceholderText("Write your text here");
    const button = screen.getByText("Create Pdf");

    fireEvent.change(textarea, { target: { value: "Hello, world!" } });
    fireEvent.click(button);

    expect(textarea).toHaveValue("");
  });
});
