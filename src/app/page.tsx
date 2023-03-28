import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import { Lexend_Zetta } from "next/font/google";

const lexendZetta = Lexend_Zetta({ subsets: ["latin"] });

export default function Home() {
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
          <ProductCard
            name="Lingerie"
            photos={[
              "https://charme-de-madame.s3.sa-east-1.amazonaws.com/2226cc40-c0fb-4a64-a074-38e7dbf5db9c401967-65-auto-auto-pvuTfraCIl0.jpg",
              "https://charme-de-madame.s3.sa-east-1.amazonaws.com/69e2bf9f-de77-4f80-beda-b0cf36579ea181rjiuaeRiL._AC_SL1500_.jpg",
              "https://charme-de-madame.s3.sa-east-1.amazonaws.com/7500b19b-cefa-4f1d-b642-169f45a06ca7238870.jpg",
            ]}
          />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
