import { IProduct } from "@/models/product";
import classNames from "classnames";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";

interface IProductDetailProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}

const ProductDetail = ({
  product,
  className,
  ...rest
}: IProductDetailProps) => {
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <div
      className={classNames(
        className,
        "flex flex-wrap max-h-[750px] max-w-[800px]"
      )}
      {...rest}
    >
      <div className="flex flex-col space-y-5">
        <div className="overflow-hidden rounded-lg min-w-[280px] min-h-[280px] sm:min-h-[220px]">
          <div className="relative w-full transition duration-500 ease-in-out transform translate-x-0 min-w-[280px] min-h-[280px] sm:min-h-[220px]">
            {product.photos.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out transform ${
                  index === currIndex ? "" : "translate-x-full"
                }`}
              >
                <Image
                  priority
                  loading="eager"
                  height={1600}
                  width={1200}
                  style={{ height: "100%", width: "100%" }}
                  src={image}
                  className="w-full h-full object-cover rounded-lg"
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row overflow-x-auto gap-5">
          {product.photos.map((photo, index) => (
            <div
              onClick={() => setCurrIndex(index)}
              className="cursor-pointer"
              key={`product-detail-photo-${index}`}
            >
              <Image
                priority
                loading="eager"
                className="h-auto max-w-full rounded-lg"
                src={photo}
                width={100}
                height={100}
                alt="..."
              />
            </div>
          ))}
        </div>
        <div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {product.name} - {product.size}
          </span>
        </div>
        <div>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Valor:{" "}
            {product.value!.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
