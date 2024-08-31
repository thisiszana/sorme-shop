"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
  const pathName = usePathname();
  return (
    <nav className="max-lg:hidden">
      <ul className="flex items-center gap-[40px]">
        {navLinks.map((el) => {
          const { link, title, icon } = el;
          const isActive = pathName === link;
          return (
            <li key={title}>
              <Link
                href={link}
                className={`block hover:text-violet-600 hover:border-b-violet-400 transition1 font-light text-[14px] py-[25px] border-b-2 border-t-2 border-t-transparent ${
                  isActive
                    ? "border-violet-500 text-violet-600"
                    : "text-gray-500 border-transparent"
                }`}
              >
                <div className="flex justify-center items-center">
                  <span className="text-[20px] mr-3">{icon}</span>
                  <p>{title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
