"use client"
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import { IProduct } from "@/models/product";
import useSWR from "swr"

export default function Home() {
  const {data} = useSWR<IProduct[]>(`/api/product/search`, (url) => fetch(url).then(res => res.json()))
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="max-w-screen-xl mx-auto my-5 space-y-5 px-5">
        <section id="filters"></section>
        <section
          id="products"
          className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5"
        >
          {!!data && data.map((product, key) => <ProductCard
            key={`product-${key}`} {...product}
          />)}
        </section>
      </main>
      <footer></footer>
    </>
  );
}
