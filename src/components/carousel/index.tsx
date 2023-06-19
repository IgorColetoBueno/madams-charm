import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";

type CarouselProps = {
  images: string[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goToNextSlide = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const goToPrevSlide = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg min-w-[280px] min-h-[280px] sm:min-h-[220px]">
        <div className="relative w-full transition duration-500 ease-in-out transform translate-x-0 min-w-[280px] min-h-[280px] sm:min-h-[220px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out transform ${
                index === activeIndex ? "" : "translate-x-full"
              }`}
            >
              <Image
                height={1600}
                width={1200}
                style={{ height: "100%", width: "100%" }}
                src={image}
                className="w-full h-full object-cover object-center rounded-lg"
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 z-10 w-full">
        <div className="flex justify-between px-4">
          <button
            data-testid="product-card-previous"
            className="absolute top-0 bottom-0 left-0 z-10 h-[24px] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-80 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none motion-reduce:transition-none"
            type="button"
            onClick={goToPrevSlide}
          >
            <span className="inline-block rounded-full bg-gray-50 dark:bg-gray-500 text-gray-400 dark:text-gray-200">
              <ChevronLeftIcon width={30} height={30} className="h-7 w-7 p-1" />
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>
          <button
            data-testid="product-card-next"
            onClick={goToNextSlide}
            className="absolute top-0 bottom-0 right-0 z-10 h-[24px] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-80 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none motion-reduce:transition-none"
            type="button"
          >
            <span className="inline-block rounded-full bg-gray-50 dark:bg-gray-500 text-gray-400 dark:text-gray-200">
              <ChevronRightIcon className="h-7 w-7 p-1" />
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
