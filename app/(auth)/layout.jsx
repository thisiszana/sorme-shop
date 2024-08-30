import { getServerSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  const session = getServerSession();

  if (session) redirect("/profile/personal-information");
  return <main>{children}</main>;
}
