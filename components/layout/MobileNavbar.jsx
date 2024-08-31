"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Close, MenuBars } from "../icons/Icons";
import { Drawer } from "antd";
import Link from "next/link";
import { navLinks } from "@/constants";

export default function MobileNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathName = usePathname();

  const closeDrawer = () => setOpenMenu(false);
  const drawerOption = {
    title: (
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-[10px]">
          <div className="flex items-center italic font-bold">
            <span className="text-violet-600 text-xl">Sorme</span>
            <span className="text-black">-</span>
            <span className="text-black text-xl"> Shop</span>
          </div>
        </Link>
        <button onClick={closeDrawer}>
          <Close />
        </button>
      </div>
    ),
    styles: {
      body: {
        display: "flex",
        flexDirection: "colum",
        justifyContent: "space-between",
        gap: "30px",
      },
    },
    drawerContent: (
      <ul className="space-y-[10px]">
        {navLinks.map((item) => {
          const { link, title, icon } = item;
          const isActive = pathName === link;
          return (
            <li key={title} onClick={closeDrawer}>
              <Link
                href={link}
                className={`block hover:text-violet-600 hover:border-b-violet-400 transition1 text-[14px] py-[10px] ${
                  isActive
                    ? "bg-violet-50 pl-[15px] border-l-2 border-violet-500 text-violet-600 font-bold"
                    : "text-gray-500 border-transparent font-light"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-[20px] mr-3">{icon}</span>{" "}
                  <p>{title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    ),
  };
  return (
    <>
      <button
        onClick={() => setOpenMenu(true)}
        className="iconSize lg:hidden paddingIcon mr-4"
      >
        <MenuBars />
      </button>
      <Drawer
        title={drawerOption.title}
        styles={drawerOption.styles}
        placement="left"
        open={openMenu}
        closeIcon={false}
      >
        {drawerOption.drawerContent}
      </Drawer>
    </>
  );
}
