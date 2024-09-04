"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "antd";

import { Exclamation, ShoppingCart, User } from "../icons/Icons";

import CartDrawer from "../shared/cart/CartDrawer";
import { QUERY_KEY } from "@/services/queriesKey";
import { getUserCart } from "@/services/queries";
import useSession from "@/hooks/useSession";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Loader from "../shared/Loader";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();
  const { data: cartData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user_cart],
    queryFn: getUserCart,
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <header className="w-full bg-white border-b fixed top-0 z-[1000]">
      <div className="maxWidth w-full flex items-center justify-between max-lg:py-4 paddingX">
        <div className="flex items-center lg:gap-[50px]">
          <MobileNavbar />
          <Link href="/" className="flex items-center gap-[10px]">
            <div className="flex items-center italic font-bold">
              <span className="text-violet-600 text-xl">Sorme</span>
              <span className="text-black">-</span>
              <span className="text-black text-xl"> Shop</span>
            </div>
          </Link>
          <DesktopNavbar />
        </div>
        <div className="flex items-center mainGap">
          <Link
            href="/signup"
            className={`iconSize paddingIcon rounded-full hover:bg-gray-100 transition1 border ${
              pathname.includes("/profile")
                ? "border-violet-500 text-violet-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            {<User />}
          </Link>

          <button
            disabled={isLoading}
            onClick={() => setOpenCart(true)}
            className={`iconSize relative paddingIcon rounded-full hover:bg-gray-100 transition1 border ${
              pathname.includes("/checkout")
                ? "border-violet-500 text-violet-600"
                : "text-gray-500 border-transparent"
            }`}
          >
            {isLoading ? <Loader h={15} w={15} /> : <ShoppingCart />}
            {cartData?.cart?.totalProductsCount > 0 && (
              <div className="w-[17px] h-[17px] flex items-center justify-center text-[10px] absolute bottom-0 right-0 bg-red-600 text-white rounded-full">
                {cartData?.cart?.totalProductsCount}
              </div>
            )}
          </button>
          {openCart && (
            <CartDrawer
              openCart={openCart}
              setOpenCart={setOpenCart}
              cart={cartData}
              session={session}
            />
          )}
        </div>
      </div>
    </header>
  );
}
