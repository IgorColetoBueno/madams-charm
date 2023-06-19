import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Lexend_Zetta } from "next/font/google";
import classNames from "classnames";
const lexendZetta = Lexend_Zetta({ subsets: ["latin"] });

const Navbar = () => {
  return (
    <nav className="p-3 border-gray-200 rounded bg-[#ff2854] dark:bg-[#ff2854] dark:border-gray-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a
          href="#"
          className={classNames("flex items-center", lexendZetta.className)}
        >
          <span className="text-md">Charme de Madame</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
