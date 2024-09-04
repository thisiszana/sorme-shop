import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[15px]">
      <Image
        src={images.empty_cart}
        width={300}
        height={300}
        alt="Cart is Empty!"
        priority
        className="max-md:w-[150px]"
      />
      <h1 className="subheader">Your cart is empty</h1>
      <p className="subtitle text-center">
        Looks like you haven&apos;t made your menu yet.
      </p>
      <Link
        href="/products"
        className="bg-blue-500 py-3 px-10 text-white border-b-8 border-gray-300"
      >
        Back to shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
