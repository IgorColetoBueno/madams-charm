import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./index";
import { IProduct } from "@/models/product";

describe("ProductCard component", () => {
  const product: IProduct = {
    _id: "1",
    photos: ["/photo1.jpg", "/photo2.jpg"],
    name: "Product name",
    promotionalMessage: "Promotion message",
    value: 10.99,
    size: "G",
    buyDate: new Date(),
    buyValue: 5,
    category: "Camisola",
  };

  it("should render correctly", () => {
    render(<ProductCard {...product} onClick={() => {}} />);

    expect(screen.getByTestId("product-card")).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.size)).toBeInTheDocument();
    expect(screen.getByText(product.promotionalMessage)).toBeInTheDocument();
    expect(screen.getByText("R$ 10,99")).toBeInTheDocument();
  });

  it("should navigate to previous photo", () => {
    render(<ProductCard {...product} onClick={() => {}} />);

    const previousButton = screen.getByTestId("product-card-previous");
    const productImage = screen.getByAltText("...");

    fireEvent.click(previousButton);

    expect(productImage.getAttribute("src")).toContain(
      product.photos[1].replace("/", "%2F")
    );
  });

  it("should navigate to next photo", () => {
    render(<ProductCard {...product} onClick={() => {}} />);

    const nextButton = screen.getByTestId("product-card-next");
    const productImage = screen.getByAltText("...");

    fireEvent.click(nextButton);

    expect(productImage.getAttribute("src")).toContain(
      product.photos[1].replace("/", "%2F")
    );
  });

  it("should call onDelete function when delete button is clicked", () => {
    const handleDelete = jest.fn();

    render(
      <ProductCard {...product} onClick={() => {}} onDelete={handleDelete} />
    );

    const deleteButton = screen.getByTestId("product-card-delete");

    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalled();
  });

  it("should call onClick function when card is clicked", () => {
    const handleClick = jest.fn();

    render(<ProductCard {...product} onClick={handleClick} />);

    const productCard = screen.getByTestId("product-card");

    fireEvent.click(productCard);

    expect(handleClick).toHaveBeenCalled();
  });
});
