import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PagesLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mt-[90px] pb-[150px] maxWidth pagesPaddingX min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
