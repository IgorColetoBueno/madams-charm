"use client";
import Select from "@/components/Select";
import Button from "@/components/button/Button";
import ButtonLink from "@/components/button/ButtonLink";
import Modal from "@/components/modal/Modal";
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import ProductDetail from "@/components/product-detail";
import ShoppingCart from "@/components/shopping-cart";
import Spinner from "@/components/spinner/Spinner";
import {
  IProduct,
  PRODUCT_CATEGORY_LIST,
  PRODUCT_SIZE_LIST,
} from "@/models/product";
import { RootState } from "@/store";
import {
  addProductToCart,
  deleteProductFromCart,
} from "@/store/shoppingCartSlice";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import ErrorPage from "./error";
import { getQueryStringParams } from "@/util/query-string";
import IconButton from "@/components/icon-button/IconButton";
import { IProductResponse } from "@/models/product-response";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get("category") ?? undefined;
  const size = params?.get("size") ?? undefined;
  const price = params?.get("price") ?? undefined;
  const page = params?.get("page") ?? 0;
  const hasFilters = category || size || price;

  const [currProduct, setCurrProduct] = useState<IProduct>();
  const dispatch = useDispatch();
  const shoppingCart = useSelector(
    (state: RootState) => state.data.shoppingCart
  );
  const currProductAlreadyAdded = useMemo(() => {
    if (!currProduct) return false;

    return shoppingCart.some((q) => q._id === currProduct._id);
  }, [currProduct, shoppingCart]);

  const handleDeleteFromCart = () =>
    dispatch(deleteProductFromCart(currProduct!._id));

  const handleAddToCart = () => {
    setCurrProduct(undefined);
    dispatch(addProductToCart(currProduct!));
  };

  const handleCategoryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newParams = getQueryStringParams({
        category: e.target.value,
        size,
        price,
        page,
      });

      router.replace(`?${newParams}`);
    },
    [page, price, router, size]
  );

  const handleSizeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newParams = getQueryStringParams({
        size: e.target.value,
        category,
        price,
        page,
      });

      router.replace(`?${newParams}`);
    },
    [category, page, price, router]
  );

  const handlePage = useCallback(
    (newPage: number) => {
      const newParams = getQueryStringParams({
        size,
        category,
        price,
        page: newPage.toString(),
      });

      console.log(newParams);
      router.replace(`?${newParams}`);
    },
    [category, price, router, size]
  );

  const handlePriceChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newParams = getQueryStringParams({
        price: e.target.value,
        category,
        size,
        page,
      });

      router.replace(`?${newParams}`);
    },
    [category, page, router, size]
  );

  const resetFilters = useCallback(() => {
    const newParams = getQueryStringParams({});

    router.replace(`?${newParams}`);
  }, [router]);

  const formattedQuery = getQueryStringParams({
    category,
    size,
    price,
    page,
  });

  const { data, error } = useSWR<IProductResponse>(
    `/api/product/search?${formattedQuery}`,
    (url) => fetch(url).then((res) => res.json())
  );

  const handleNextPage = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    handlePage(Math.max(Number(page) + 1, 0));
  }, [handlePage, page]);

  const handlePreviousPage = useCallback(() => {
    handlePage(Math.max(Number(page) - 1, 0));
  }, [handlePage, page]);

  if (!!error) return <ErrorPage response={error} />;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <Modal
        onClose={() => setCurrProduct(undefined)}
        open={!!currProduct}
        footer={
          <div className="flex flex-col justify-end gap-5 p-3">
            {currProductAlreadyAdded ? (
              <Button
                onClick={handleDeleteFromCart}
                color="red"
                className="flex justify-center w-full"
              >
                Remover do carrinho
                <ChevronDoubleRightIcon className="ml-2" width={20} />
              </Button>
            ) : (
              <Button
                onClick={handleAddToCart}
                color="green"
                className="flex justify-center w-full"
              >
                Adicionar ao carrinho
                <ChevronDoubleRightIcon className="ml-2" width={20} />
              </Button>
            )}
            <ButtonLink onClick={() => setCurrProduct(undefined)}>
              Voltar à lista
            </ButtonLink>
          </div>
        }
      >
        {!!currProduct && <ProductDetail product={currProduct} />}
      </Modal>
      <ShoppingCart />
      <main className="max-w-screen-xl mx-auto my-5 space-y-5 px-5 py-5">
        <section id="filters" className="flex justify-between flex-wrap gap-5">
          <div className="flex gap-5 flex-wrap">
            <Select
              value={category ?? ""}
              onChange={handleCategoryChange}
              id="category"
              label="Categoria"
              success={false}
            >
              <option value="">Selecione..</option>
              {PRODUCT_CATEGORY_LIST.map((category) => (
                <option value={category} key={`category-${category}`}>
                  {category}
                </option>
              ))}
            </Select>
            <Select
              onChange={handleSizeChange}
              value={size ?? ""}
              id="size"
              label="Tamanho"
              success={false}
            >
              <option value="">Selecione..</option>
              {PRODUCT_SIZE_LIST.map((size) => (
                <option value={size} key={`size-${size}`}>
                  {size}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex gap-5">
            <Select
              value={price}
              onChange={handlePriceChange}
              id="sort-by"
              label="Ordernar por"
              success={false}
            >
              <option value="">Selecione...</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </Select>
          </div>
        </section>
        {hasFilters && (
          <section id="reset-filters">
            <Button onClick={resetFilters} color="red">
              Limpar filtros
            </Button>
          </section>
        )}
        {!data && <Spinner />}
        {data?.hasPreviousPage && (
          <section id="show-more-upper" className="flex justify-center">
            <ButtonLink onClick={handlePreviousPage}>
              <div className="flex gap-1">
                Página anterior
                <ArrowUpIcon width={20} />
              </div>
            </ButtonLink>
          </section>
        )}
        <section id="products" className="flex justify-around flex-wrap gap-5">
          {data &&
            data.data.map((product, key) => (
              <ProductCard
                onClick={() => setCurrProduct(product)}
                key={`product-${key}`}
                {...product}
              />
            ))}
        </section>
        {data?.hasNextPage && (
          <section id="show-more-down" className="flex justify-center">
            <ButtonLink onClick={handleNextPage}>
              <div className="flex gap-1">
                Próxima página
                <ArrowDownIcon width={20} />
              </div>
            </ButtonLink>
          </section>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
