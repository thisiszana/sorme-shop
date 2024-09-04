import { redirect } from "next/navigation";

import { getServerSession } from "@/utils/session";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function layout({ children }) {
  const session = getServerSession();

  if (!session) redirect("/login");
  return (
    <div>
      <Header />
      <main className="mt-[90px] pb-[150px] maxWidth pagesPaddingX min-h-screen ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
