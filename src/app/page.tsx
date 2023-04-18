"use client";
import Navbar from "@/components/navbar/Navbar";
import ProductCard from "@/components/product-card";
import Spinner from "@/components/spinner/Spinner";
import { IProduct } from "@/models/product";
import useSWR from "swr";
import ErrorPage from "./error";
import Modal from "@/components/modal/Modal";
import { useCallback, useMemo, useState } from "react";
import ProductDetail from "@/components/product-detail";
import Button from "@/components/button/Button";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import ButtonLink from "@/components/button/ButtonLink";
import ShoppingCart from "@/components/shopping-cart";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  deleteProductFromCart,
} from "@/store/shoppingCartSlice";
import { RootState } from "@/store";

const Home = () => {
  const { data, error } = useSWR<IProduct[]>(`/api/product/search`, (url) =>
    fetch(url).then((res) => res.json())
  );
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
      <main className="max-w-screen-xl mx-auto my-5 space-y-5 px-5">
        <section id="filters"></section>
        {!data && <Spinner />}
        <section id="products" className="flex justify-around flex-wrap gap-5">
          {!!data &&
            data.map((product, key) => (
              <ProductCard
                onClick={() => setCurrProduct(product)}
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
