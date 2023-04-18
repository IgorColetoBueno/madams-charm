import React from "react";
import { render } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("renders input component without crashing", () => {
    render(<Input label="test" type="text" success={true} />);
  });

  it("renders input with correct label", () => {
    const { getByLabelText } = render(
      <Input label="test label" type="text" success={true} />
    );
    expect(getByLabelText(/test label/i)).toBeInTheDocument();
  });

  it("renders input with success style when success prop is true", () => {
    const { getByLabelText } = render(
      <Input label="test" type="text" success={true} />
    );
    expect(getByLabelText(/test/i)).toHaveClass(
      "bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500"
    );
  });

  it("renders input with error style when errorMessage prop is set", () => {
    const { getByLabelText } = render(
      <Input
        label="test"
        type="text"
        success={false}
        errorMessage="test error"
      />
    );
    expect(getByLabelText(/test/i)).toHaveClass(
      "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    );
  });
});
