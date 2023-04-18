"use client";
import ErrorPage from "@/app/error";
import Loading from "@/app/loading";
import Button from "@/components/button/Button";
import Main from "@/components/main";
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import Spinner from "@/components/spinner/Spinner";
import { IProduct } from "@/models/product";
import { useRouter } from "next/navigation";
import useSWR from "swr";

interface IProductsProps {}

const Products = ({}: IProductsProps) => {
  const { data, mutate, error } = useSWR<IProduct[]>(
    `/api/product/search`,
    (url) => fetch(url).then((res) => res.json())
  );
  const router = useRouter();

  const handleNew = () => {
    router.push("/products/8a3a9b86-bc37-4628-a7d6-b9512b20ca71/add");
  };

  if (!!error) return <ErrorPage response={error} />;

  return (
    <>
      <header>
        <Navbar hideCartButton />
      </header>
      <Main>
        <div className="flex justify-end">
          <Button color="green" onClick={handleNew}>
            Add
          </Button>
        </div>
        {!data && <Spinner />}
        <section id="products" className="flex justify-around flex-wrap gap-5">
          {!!data &&
            data.map((product, key) => (
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
      </Main>
    </>
  );
};

export default Products;
