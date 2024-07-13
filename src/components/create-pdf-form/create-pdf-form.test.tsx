import { fireEvent, render, screen } from "@testing-library/react";
import usePdfContext from "../../utils/hooks/usePdf";
import CreatePdfForm from "./create-pdf-form";

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

  test("should update text area value", () => {
    render(<CreatePdfForm />);
    const textarea = screen.getByPlaceholderText("Write your text here");
    fireEvent.change(textarea, { target: { value: "Test text" } });
    expect(textarea).toHaveValue("Test text");
  });

  test("should call createPdf on button click", () => {
    render(<CreatePdfForm />);
    const textarea = screen.getByPlaceholderText("Write your text here");
    const button = screen.getByText("Create Pdf");

    fireEvent.change(textarea, { target: { value: "Test text" } });
    fireEvent.click(button);

    expect(mockCreatePdf).toHaveBeenCalledWith("Test text");
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
