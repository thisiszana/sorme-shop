import HeroSection from "./ui/HeroSection";
import LatestProducts from "./ui/LatestProducts";

export default function HomePage() {
  return (
    <main className="space-y-[100px]">
      <HeroSection />
      <LatestProducts />
    </main>
  );
}
