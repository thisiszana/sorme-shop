"use client";

import Image from "next/image";
import Link from "next/link";

import { useQueryClient } from "@tanstack/react-query";

import { Trash } from "@/components/icons/Icons";

import { reducePrice, shorterText } from "@/utils/fun";
import { deleteFromCart } from "@/actions/cart.action";
import useServerAction from "@/hooks/useServerAction";
import { QUERY_KEY } from "@/services/queriesKey";
import { icons, images } from "@/constants";
import Loader from "../Loader";

export default function CartItemCard({
  productDetails: { image, title, price, discount, _id },
  quantity,
}) {
  console.log(image[0]);
  const queryClient = useQueryClient();

  const { loading, res } = useServerAction(
    deleteFromCart,
    { productDetails: _id },
    () => queryClient.invalidateQueries(QUERY_KEY.user_cart)
  );

  const imageSrc = image[0] || images.image_not_found;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          src={image[0]}
          width={50}
          height={50}
          priority
          alt={shorterText(title, 5)}
          className="rounded-md object-cover"
        />
        <div className="flex flex-col">
          <Link
            href={`/products/${_id}`}
            target="_blank"
            className="font-medium text-sm text-gray-800 hover:underline"
          >
            {shorterText(title, 25)}
          </Link>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <p>$ {reducePrice(discount, price)}</p>
            <div className="text-xs">{icons.close}</div>
            <p>{quantity}</p>
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={() => res()}
        className={`p-2 rounded-md ${
          loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {loading ? <Loader h={20} w={20} /> : <Trash className="text-white" />}
      </button>
    </div>
  );
}
