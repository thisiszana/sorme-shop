import Link from "next/link";
import { Image } from "@nextui-org/react";
import { reducePrice, shorterText } from "@/utils/fun";

export default function ProductCard({ title, image, price, discount, _id }) {
  const finalPrice = reducePrice(discount, price).toLocaleString();
  const originalPrice = price.toLocaleString();

  return (
    <div className="relative w-[320px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link
        href={`/products/${_id}`}
        className="block relative aspect-w-1 aspect-h-1 bg-gray-100"
      >
        <Image
          src={image[0]}
          width={320}
          height={320}
          alt={title}
          className="object-contain w-full h-full"
          showSkeleton
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            %{discount} OFF
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-800">
          {shorterText(title, 40)}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-900">${finalPrice}</p>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
