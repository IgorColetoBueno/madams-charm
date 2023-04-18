import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("Button renders with correct classnames and children", () => {
    const { getByText } = render(<Button color="blue">Click me</Button>);
    const button = getByText("Click me");
    expect(button).toHaveClass(
      "font-medium",
      "rounded-lg",
      "text-sm",
      "px-10",
      "py-3",
      "text-center",
      "shadow-lg",
      "bg-gradient-to-r",
      "hover:bg-gradient-to-br",
      "focus:ring-4",
      "focus:outline-none",
      "text-white",
      "from-blue-500",
      "via-blue-600",
      "to-blue-700",
      "shadow-blue-500/50"
    );
  });

  it("Button renders with additional classnames when className prop is passed", () => {
    const { getByText } = render(
      <Button color="green" className="my-custom-class">
        Click me
      </Button>
    );
    const button = getByText("Click me");
    expect(button).toHaveClass("my-custom-class");
  });

  it("Button correctly handles additional props", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button color="purple" onClick={onClick}>
        Click me
      </Button>
    );
    const button = getByText("Click me");
    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
