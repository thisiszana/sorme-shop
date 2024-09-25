
import Link from "next/link";

import { reducePrice, shorterText } from "@/utils/fun";
import { Image } from "@nextui-org/react";

export default function ProductCard(props) {
  const { title, image, price, discount, _id } = props;
  return (
    <div className="rounded-2xl p-4 cardShadow3 flex flex-col justify-between relative w-[320px]">
      <div className="mb-[15px]">
        <Link
          className="w-full flex justify-center mx-3 my-10"
          href={`/products/${_id}`}
        >
          <Image
            src={image[0]}
            width={300}
            height={280}
            alt={title}
            priority
            className="w-[200px] h-[200px] card-image"
          />
        </Link>
        <p className="subheader">{shorterText(title, 40)}</p>
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-[20px]">
              $ {reducePrice(discount, price).toLocaleString()}
            </p>
            {discount > 0 && (
              <span className="bg-red-100 rounded-xl py-1 px-2 text-red-500 absolute right-1 top-1">
                % {discount}
              </span>
            )}
          </div>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-[12px] ml-[20px]">
              {price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
