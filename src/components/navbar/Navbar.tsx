import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="p-3 border-gray-200 rounded bg-[#ff2854] dark:bg-[#ff2854] dark:border-gray-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
