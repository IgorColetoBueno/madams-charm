import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface INavbarProps {}

const Navbar = ({}: INavbarProps) => {
  return (
    <nav className="p-3 border-gray-200 rounded bg-[#ff2854] dark:bg-[#ff2854] dark:border-gray-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
        </a>
        <button
          type="button"
          className="text-white hover:text-[#ff2854] border border-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-white"
        >
          <ShoppingCartIcon width={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
