import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

test("renders the logo", () => {
  render(<Navbar />);
  const logo = screen.getByAltText("Logo");
  expect(logo).toBeInTheDocument();
});

test("hides cart button when hideCartButton prop is true", () => {
  render(<Navbar hideCartButton={true} />);
  expect(screen.queryByTestId("shopping-cart")).toBe(null);
});

test("shows cart button when hideCartButton prop is false", () => {
  render(<Navbar hideCartButton={false} />);
  const cartButton = screen.getByTestId("shopping-cart");
  expect(cartButton).toBeInTheDocument();
});
