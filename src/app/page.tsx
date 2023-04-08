"use client";
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import { IProduct } from "@/models/product";
import useSWR from "swr";

const Home = () => {
  const { data } = useSWR<IProduct[]>(`/api/product/search`, (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="max-w-screen-xl mx-auto my-5 space-y-5 px-5">
        <section id="filters"></section>
        <section
          id="products"
          className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5"
        >
          {!!data &&
            data.map((product, key) => (
              <ProductCard
                onClick={() => {}}
                key={`product-${key}`}
                {...product}
              />
            ))}
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
