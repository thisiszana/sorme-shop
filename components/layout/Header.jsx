"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ShoppingCart, User } from "../icons/Icons";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  const pathname = usePathname();
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
          <button className="iconSize relative paddingIcon rounded-full hover:bg-gray-100 transition1 border text-gray-500 border-transparent">
            {<ShoppingCart />}
          </button>
        </div>
      </div>
    </header>
  );
}
