"use client";
import ErrorPage from "@/app/error";
import Select from "@/components/Select";
import Button from "@/components/button/Button";
import ButtonLink from "@/components/button/ButtonLink";
import Main from "@/components/main";
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import Spinner from "@/components/spinner/Spinner";
import { PRODUCT_CATEGORY_LIST, PRODUCT_SIZE_LIST } from "@/models/product";
import { IProductResponse } from "@/models/product-response";
import { getQueryStringParams } from "@/util/query-string";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import useSWR from "swr";

interface IProductsProps {}

const Products = ({}: IProductsProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const category = params?.get("category") ?? undefined;
  const size = params?.get("size") ?? undefined;
  const price = params?.get("price") ?? undefined;
  const page = params?.get("page") ?? 0;
  const hasFilters = category || size || price;
  const formattedQuery = getQueryStringParams({
    category,
    size,
    price,
    page,
  });
  const { data, mutate, error } = useSWR<IProductResponse>(
    `/api/product/search?${formattedQuery}`,
    (url) => fetch(url).then((res) => res.json())
  );

  const handleNew = () => {
    router.push("/products/8a3a9b86-bc37-4628-a7d6-b9512b20ca71/add");
  };

  const handleCategoryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newParams = getQueryStringParams({
        category: e.target.value,
        size,
        price,
      });

      router.replace(
        `/products/8a3a9b86-bc37-4628-a7d6-b9512b20ca71?${newParams}`
      );
    },
    [price, router, size]
  );

  const handleSizeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newParams = getQueryStringParams({
        size: e.target.value,
        category,
        price,
      });

      router.replace(
        `/products/8a3a9b86-bc37-4628-a7d6-b9512b20ca71?${newParams}`
      );
    },
    [category, price, router]
  );

  const handlePage = useCallback(
    (newPage: number) => {
      const newParams = getQueryStringParams({
        size,
        category,
        price,
        page: newPage.toString(),
      });

      router.replace(
        `/products/8a3a9b86-bc37-4628-a7d6-b9512b20ca71?${newParams}`
      );
    },
    [category, price, router, size]
  );

  const handlePriceChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newParams = getQueryStringParams({
        price: e.target.value,
        category,
        size,
      });

      router.replace(`?${newParams}`);
    },
    [category, router, size]
  );

  const resetFilters = useCallback(() => {
    const newParams = getQueryStringParams({});

    router.replace(`?${newParams}`);
  }, [router]);

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
      <Main>
        <div className="flex justify-end">
          <Button color="green" onClick={handleNew}>
            Add
          </Button>
        </div>
        {!data && <Spinner />}
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
          {!!data?.data &&
            data.data.map((product, key) => (
              <ProductCard
                onDelete={() =>
                  fetch(`/api/product/delete/${product._id}`, {
                    method: "DELETE",
                  }).then(() => mutate())
                }
                onClick={() =>
                  router.push(
                    `/products/8a3a9b86-bc37-4628-a7d6-b9512b20ca71/edit/${product._id}`
                  )
                }
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
      </Main>
    </>
  );
};

export default Products;
