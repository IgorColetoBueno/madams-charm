"use client";
import { IProduct } from "@/models/product";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from "react";
import Carousel from "../carousel";
import IconButton from "../icon-button/IconButton";

type IProductCardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<IProduct> & {
    onClick: () => void;
    onDelete?: () => void;
  };

const ProductCard = ({
  _id,
  photos = [],
  name,
  promotionalMessage,
  value,
  size,
  onClick,
  onDelete,
}: IProductCardProps) => {
  const handleDelete = (e: MouseEvent<HTMLButtonElement, any>) => {
    e.stopPropagation();

    onDelete!();
  };

  return (
    <div
      data-testid="product-card"
      onClick={onClick}
      className="relative cursor-pointer sm:w-[280px] w-full rounded-lg justify-self-center bg-gray-200 border border-gray-200 rounded-lg shadow shadow-lg dark:border-gray-800 dark:bg-gray-800 hover:shadow-xl"
    >
      {!!photos?.length && <Carousel images={photos} />}
      {!!onDelete && (
        <IconButton
          data-testid="product-card-delete"
          onClick={handleDelete}
          bgColor="red"
          color="white"
          textColor="white"
          textColorOnHover="red"
          className="absolute -top-2 -right-2 z-[2]"
        >
          <XMarkIcon width={15} />
        </IconButton>
      )}
      <div className="p-2 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-lg dark:text-white text-gray-800 font-medium flex justify-between">
            <span>{name}</span>
          </span>
          {!!promotionalMessage && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {promotionalMessage}
            </p>
          )}
        </div>
        <div className="flex justify-between flex-row w-full mt-10">
          <p className="text-semibold self-end">{size}</p>
          <p className="text-semibold text-2xl self-end">
            {value!.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
