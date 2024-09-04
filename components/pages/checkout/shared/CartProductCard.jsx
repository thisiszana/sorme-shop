import Link from "next/link";
import Image from "next/image";

import AddToCart from "../../productDetail/ui/AddToCart";
import { reducePrice } from "@/utils/fun";
import { icons } from "@/constants";

export default function CartProductCard({
  productDetails: { image, title, price, discount, _id, stock },
  quantity,
}) {
  return (
    <div className="cardShadow3 rounded-xl px-4 py-6 flex">
      <div className="flex max-lg:flex-col lg:items-center gap-10 w-full">
        <div className="p-4 flex items-center justify-center max-lg:w-full">
          <Image
            src={image && image}
            width={200}
            height={200}
            alt={title}
            priority
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link href={`/products/${_id}`} target="_blank" className="w-fit">
            {title}
          </Link>
          <div className="flex items-center gap-2">
            <p className="subtitle">Stock:</p>
            <p className={`font-medium ${stock < 10 && "text-orange-400"}`}>
              {stock.toLocaleString()}
            </p>
          </div>
          <hr />
          <div className="flex items-center gap-2 mb-[10px]">
            <p className="subtitle">
              $ {reducePrice(discount, price).toLocaleString()}
            </p>
            <div className="text-[8px]">{icons.close}</div>
            <p className="subtitle">{quantity}</p>
            <p className="text-green-600 font-medium text-[14px]">
              $ {(reducePrice(discount, price) * quantity).toLocaleString()}
            </p>
          </div>
          <div className="w-full flex justify-end">
            <AddToCart
              productId={JSON.parse(JSON.stringify(_id))}
              stock={stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
