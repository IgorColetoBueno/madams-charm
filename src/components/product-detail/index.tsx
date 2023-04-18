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
  const [currImage, setCurrImage] = useState(product.photos[0]);

  return (
    <div
      className={classNames(className, "flex flex-wrap max-h-[750px]")}
      {...rest}
    >
      <div className="flex flex-col m-w-96 space-y-5">
        {product.photos.map((photo, index) => (
          <div
            key={`product-main-photo-${index}`}
            className={classNames({ hidden: currImage !== photo })}
          >
            <Image
              priority={index === 0}
              className="max-h-[500px] rounded-lg"
              src={currImage}
              width={500}
              height={500}
              alt="..."
            />
          </div>
        ))}
        <div className="flex flex-row overflow-x-auto gap-5">
          {product.photos.map((photo, index) => (
            <div
              onClick={() => setCurrImage(photo)}
              className="cursor-pointer"
              key={`product-detail-photo-${index}`}
            >
              <Image
                priority
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
