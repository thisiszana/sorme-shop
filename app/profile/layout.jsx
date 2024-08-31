import { redirect } from "next/navigation";
import Image from "next/image";

import { getServerSession } from "@/utils/session";

import ProfileMobilebar from "@/components/profiles/shared/ProfileMobilebar";
import ProfileSidebar from "@/components/profiles/shared/ProfileSidebar";

import Header from "@/components/layout/Header";

import { getUser } from "@/actions/user.action";
import { User } from "@/components/icons/Icons";
import { images } from "@/constants";

export default async function ProfileLayout({ children }) {
  const session = getServerSession();
  const user = await getUser();

  const gender = user.user?.gender;

  if (!session) redirect("/login");
  return (
    <div>
      <Header />
      <div className="mt-[90px] pb-[150px] maxWidth2 pagesPaddingX min-h-screen">
        <div>
          <ProfileSidebar
            session={session}
            user={JSON.parse(JSON.stringify(user))}
          />
          <main className="lg:pl-[330px] lg:pt-[15px]">{children}</main>
        </div>
        <div className="lg:hidden fixed bottom-[68.5px] backdrop-blur bg-white/85 w-full flex items-center gap-[10px] px-5 py-2 border-t border-gray-100">
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
              className="rounded-full"
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
        <ProfileMobilebar {...JSON.parse(JSON.stringify(user))} />
      </div>
    </div>
  );
}
