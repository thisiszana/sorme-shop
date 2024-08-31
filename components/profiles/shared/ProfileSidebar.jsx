"use client";

import { User } from "@/components/icons/Icons";
import { icons, images, profilePages } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileMobilebar({ session, user }) {
  const pathName = usePathname();
  const role = user.user?.role;
  const gender = user.user?.gender;

  return (
    <aside className="max-lg:hidden cardShadow p-4 rounded-xl w-[300px] fixed z-10 bg-white flex flex-col gap-[15px]">
      <div className="flex items-center gap-[20px]">
        {!gender || gender === "etc" ? (
          <span className="rounded-full border p-[10px] flex items-center justify-center">
            <User />
          </span>
        ) : gender === "female" ? (
          <Image
            src={images.womanmanavatar}
            width={45}
            height={45}
            priority
            alt="user icon"
            className="rounded-full cardShadow"
          />
        ) : (
          <Image
            src={images.manavatar}
            width={45}
            height={45}
            priority
            alt="user icon"
            className="rounded-full"
          />
        )}
        <p className="subtitle">
          {session.username.split("@")[0] || session.username}
        </p>
      </div>
      {profilePages.map((el) => (
        <Link
          key={el.route}
          href={`/profile/${el.route}`}
          className={`flex items-center gap-[20px] p-1 ${
            pathName.includes(`/profile/${el.route}`)
              ? "font-medium text-violet-600"
              : "text-gray-500 border-transparent"
          }`}
        >
          <div className="iconSize">{el.icon}</div>
          <p className="subtitle">{el.name}</p>
        </Link>
      ))}
      {role === "ADMIN" && (
        <Link
          href={`${process.env.ADMIN_URL}`}
          target="_blank"
          className="flex items-center gap-[20px] p-1"
        >
          <div className="iconSize">{icons.admin}</div>
          <p className="subtitle">Admin</p>
        </Link>
      )}
    </aside>
  );
}
