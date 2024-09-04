"use client";

import Image from "next/image";
import Link from "next/link";

import { useQueryClient } from "@tanstack/react-query";

import { Trash } from "@/components/icons/Icons";

import { reducePrice, shorterText } from "@/utils/fun";
import { deleteFromCart } from "@/actions/cart.action";
import useServerAction from "@/hooks/useServerAction";
import { QUERY_KEY } from "@/services/queriesKey";
import { icons } from "@/constants";
import Loader from "../Loader";

export default function CartItemCard({
  productDetails: { image, title, price, discount, _id },
  quantity,
}) {
  const queryClient = useQueryClient();

  const { loading, res } = useServerAction(
    deleteFromCart,
    { productDetails: _id },
    () => queryClient.invalidateQueries(QUERY_KEY.user_cart)
  );
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[20px]">
        <Image src={image} width={35} height={35} priority alt={title} />
        <div>
          <Link
            href={`/products/${_id}`}
            target="_blank"
            className="font-medium text-[14px]"
          >
            {shorterText(title, 20)}
          </Link>
          <div className="flex items-center gap-2">
            <p>$ {reducePrice(discount, price)}</p>
            <div className="text-[8px]">{icons.close}</div>
            <p>{quantity}</p>
          </div>
        </div>
      </div>
      <button disabled={loading} onClick={res} className="iconSize">
        {loading ? <Loader h={20} w={20} /> : <Trash />}
      </button>
    </div>
  );
}
