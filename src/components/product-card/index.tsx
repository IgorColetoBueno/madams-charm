"use client";
import { IProduct } from "@/models/product";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import Button from "../Button";

type IProductCardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<IProduct>;

const ProductCard = ({
  _id,
  photos = [],
  name,
  promotionalMessage,
  value
}: IProductCardProps) => {
  const [page, setPage] = useState(1);

  const navigateToPrevious = () => {
    if (page === 1) {
      setPage(photos.length);
      return;
    }
    setPage(page - 1);
  };

  const navigateToNext = () => {
    if (page === photos?.length) {
      setPage(1);
      return;
    }
    setPage(page + 1);
  };

  return (
    <div className="w-[280px] h-[370px] rounded-lg justify-self-center border border-gray-200 rounded-lg shadow dark:border-gray-800 dark: bg-gray-800 dark:shadow-lg">
      {!!photos?.length && (
        <div id={`carousel-${_id}`} className="relative">
          <div className="relative overflow-hidden after:clear-both after:block after:content-['']">
            <div
              className={
                "relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              }
              style={{ "backface-visibility": "hidden" } as any}
            >
              <Image
                height={220}
                width={280}
                style={{ height: "220px", width: "280px" }}
                className="rounded-lg"
                src={photos[page - 1]}
                alt="..."
              />
            </div>
          </div>
          <button
            className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-80 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none motion-reduce:transition-none"
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
            onClick={navigateToNext}
            className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-80 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none motion-reduce:transition-none"
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
      <div className="p-2 h-[110px] flex flex-col justify-between">
        <div>
          <span className="text-lg dark:text-white text-gray-800 font-medium">
            {name}
          </span>
          {!!promotionalMessage && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{promotionalMessage}</p>
          )}
        </div>
        <div className="flex justify-end flex-col w-full">
          <p className="text-semibold text-2xl self-end">{value!.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          })}</p>
          <Button color="green" className="w-full mt-2">
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
