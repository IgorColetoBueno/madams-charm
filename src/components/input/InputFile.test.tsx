import React from "react";
import { render } from "@testing-library/react";
import InputFile from "./InputFile";

describe("Input file", () => {
  it("renders input file component without crashing", () => {
    render(<InputFile />);
  });

  it("renders input file with correct label", () => {
    const { getByLabelText } = render(<InputFile />);
    expect(getByLabelText(/upload files/i)).toBeInTheDocument();
  });

  it("renders input file with correct accept attribute", () => {
    const { getByLabelText } = render(<InputFile />);
    expect(getByLabelText(/upload files/i)).toHaveAttribute(
      "accept",
      "image/jpg,image/jpeg,image/gif,image/png"
    );
  });

  it("renders input file with custom id", () => {
    const { getByLabelText } = render(<InputFile id="custom-id" />);
    expect(getByLabelText(/upload files/i)).toHaveAttribute("id", "custom-id");
  });
});
