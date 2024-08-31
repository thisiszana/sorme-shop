"use client";

import { icons, profilePages } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileMobilebar(props) {
  const pathName = usePathname();

  const { role } = props?.user;
  return (
    <div className="lg:hidden fixed bottom-0 backdrop-blur bg-white/85 w-full flex items-center justify-evenly border-t border-gray-100">
      {profilePages.map((el) => (
        <Link
          key={el.route}
          href={`/profile/${el.route}`}
          className={`flex flex-1 flex-col items-center gap-[5px] p-3 ${
            pathName.includes(`/profile/${el.route}`)
              ? "font-medium text-violet-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          <div className="iconSize">{el.icon}</div>
          <p className="text-[10px]">{el.name.split(" ")[0]}</p>
        </Link>
      ))}
      {role === "ADMIN" && (
        <Link
          href={`${process.env.ADMIN_URL}`}
          target="_blank"
          className="flex flex-1 flex-col items-center gap-[5px] p-3"
        >
          <div className="iconSize">{icons.admin}</div>
          <p className="text-[10px]">Admin</p>
        </Link>
      )}
    </div>
  );
}
