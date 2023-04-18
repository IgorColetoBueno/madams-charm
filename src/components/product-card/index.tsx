"use client";
import { IProduct } from "@/models/product";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes, MouseEvent, useState } from "react";
import IconButton from "../icon-button/IconButton";
import classNames from "classnames";

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
  const [page, setPage] = useState(0);

  const navigateToPrevious = (e: MouseEvent<HTMLButtonElement, any>) => {
    e.stopPropagation();

    if (page === 0) {
      setPage(photos.length - 1);
      return;
    }
    setPage(page - 1);
  };

  const navigateToNext = (e: MouseEvent<HTMLButtonElement, any>) => {
    e.stopPropagation();

    if (page === photos?.length - 1) {
      setPage(0);
      return;
    }
    setPage(page + 1);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement, any>) => {
    e.stopPropagation();

    onDelete!();
  };

  return (
    <div
      data-testid="product-card"
      onClick={onClick}
      className="relative cursor-pointer w-[280px] rounded-lg justify-self-center bg-gray-200 border border-gray-200 rounded-lg shadow shadow-lg dark:border-gray-800 dark:bg-gray-800 hover:shadow-xl"
    >
      {!!photos?.length && (
        <div id={`carousel-${_id}`} className="relative">
          <div className="relative overflow-hidden after:clear-both after:block after:content-['']">
            <div
              className={
                "relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              }
              style={{ backfaceVisibility: "hidden" } as any}
            >
              {photos.map((photo, index) => (
                <Image
                  key={`product-card-photo-${index}`}
                  height={1600}
                  width={1200}
                  style={{ height: "220px", width: "280px" }}
                  className={classNames("rounded-lg", {
                    hidden: index !== page,
                  })}
                  src={photo}
                  alt="..."
                />
              ))}
            </div>
          </div>
          <button
            data-testid="product-card-previous"
            className="absolute top-0 bottom-0 left-0 z-10 flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-80 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none motion-reduce:transition-none"
            type="button"
            onClick={navigateToPrevious}
          >
            <span className="inline-block rounded-full bg-gray-50 dark:bg-gray-500 text-gray-400 dark:text-gray-200">
              <ChevronLeftIcon className="h-6 w-6 p-1" />
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>
          <button
            data-testid="product-card-next"
            onClick={navigateToNext}
            className="absolute top-0 bottom-0 right-0 z-10 flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-80 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none motion-reduce:transition-none"
            type="button"
          >
            <span className="inline-block rounded-full bg-gray-50 dark:bg-gray-500 text-gray-400 dark:text-gray-200">
              <ChevronRightIcon className="h-6 w-6 p-1" />
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>
      )}
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
            <span>{name} </span>
            <span>{size}</span>
          </span>
          {!!promotionalMessage && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {promotionalMessage}
            </p>
          )}
        </div>
        <div className="flex justify-end flex-col w-full">
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
