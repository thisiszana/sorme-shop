import { images } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full h-[85vh] relative">
      <div className="text-center absolute top-[3%] left-1/2 -translate-x-1/2 -translate-y-[3%]">
        <h1
          className="text-[40px] sm:text-[50px] md:text-[60px] font-bold"
          data-aos="fade-down"
        >
          Honest Shopping
        </h1>
        <p
          className="text-[16px] sm:text-[18px] md:text-[20px] font-medium my-2"
          data-aos="fade-right"
        >
          Find the best deals on your favorite products
        </p>
        <Link
          href="/products"
          className="inline-block bg-white py-2 px-6 sm:py-3 sm:px-8 md:py-3 md:px-10 mt-2 rounded-lg"
          data-aos="fade-left"
        >
          Shop Now
        </Link>
      </div>

      <Image
        src={images.hero_banner}
        width={1920}
        height={1080}
        alt="hero"
        priority
        className="rounded-3xl w-full h-full object-cover"
      />
    </section>
  );
}
