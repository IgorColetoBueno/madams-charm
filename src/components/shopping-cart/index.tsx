import { RootState } from "@/store";
import { deleteProductFromCart } from "@/store/shoppingCartSlice";
import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/Button";
import IconButton from "../icon-button/IconButton";
interface IShoppingCartProps {}

const ShoppingCart = ({}: IShoppingCartProps) => {
  const [expanded, setExpanded] = useState(true);
  const shoppingCart = useSelector(
    (state: RootState) => state.data.shoppingCart
  );
  const formattedTotalValue = useMemo(() => {
    return shoppingCart
      .map((item) => item.value)
      .reduce((curr, prev) => curr + prev, 0)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  }, [shoppingCart]);

  const dispatch = useDispatch();

  const navigateToWhatsApp = () => {
    let text = "Olá, tenho interesse nos seguintes produtos:\n";

    shoppingCart.forEach(
      (product) =>
        (text += `\n${product.name} - ${
          product.size
        }: ${product.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`)
    );

    text += `\n\n Total: ${formattedTotalValue}`;

    window.open(`https://wa.me/5569993616072?text=${encodeURIComponent(text)}`);
  };

  if (!shoppingCart.length) return null;

  return (
    <div className="fixed rounded-t-xl bottom-0 w-full bg-gray-200 dark:bg-gray-800 z-20 py-3 min-h-16 space-y-5 px-5">
      <div className="flex w-full h-full items-center px-5 justify-between">
        <span className={classNames({ hidden: expanded })}>
          {shoppingCart.length} itens selecionados
        </span>

        <div
          className={classNames("min-w-[90%] space-y-2", {
            hidden: !expanded,
          })}
        >
          {shoppingCart.map((product) => (
            <div
              key={`shopping-cart-item-${product._id}`}
              className="flex lg:flex-row justify-between items-center"
            >
              <span>{product.name}</span>
              <div>
                <span>
                  {product.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <IconButton
                  className="ml-2"
                  onClick={() => dispatch(deleteProductFromCart(product._id))}
                  color="red"
                  textColor="red"
                  textColorOnHover="white"
                >
                  <XMarkIcon width={15} />
                </IconButton>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <span className="text-lg font-bold">
              Total: {formattedTotalValue}
            </span>
          </div>
        </div>
        <IconButton
          className="ml-2"
          onClick={() => setExpanded(!expanded)}
          color="white"
          textColor="white"
          textColorOnHover="white"
        >
          {expanded ? (
            <ChevronDownIcon width={20} />
          ) : (
            <ChevronUpIcon width={20} />
          )}
        </IconButton>
      </div>
      {expanded && (
        <Button
          onClick={() => navigateToWhatsApp()}
          color="green"
          className="flex justify-center w-full"
        >
          Fechar compra
          <ChevronDoubleRightIcon className="ml-2" width={20} />
        </Button>
      )}
    </div>
  );
};

export default ShoppingCart;
