"use client";

import {
  addToCart,
  decreaseFromCart,
  deleteFromCart,
} from "@/actions/cart.action";
import { Exclamation, Trash } from "@/components/icons/Icons";
import Loader from "@/components/shared/Loader";
import { icons } from "@/constants";
import useServerAction from "@/hooks/useServerAction";
import useSession from "@/hooks/useSession";
import { getUserCart } from "@/services/queries";
import { QUERY_KEY } from "@/services/queriesKey";
import { isInCart, productQuantity } from "@/utils/fun";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddToCart({ productId, stock }) {
  const { data: session } = useSession();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.user_cart],
    queryFn: getUserCart,
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  });

  const router = useRouter();

  const { loading: addLoading, res: addRes } = useServerAction(
    addToCart,
    { productId },
    () => refetch()
  );

  const { loading: decreaseLoading, res: decreaseRes } = useServerAction(
    decreaseFromCart,
    { productId },
    () => refetch()
  );

  const { loading: deleteLoading, res: deleteRes } = useServerAction(
    deleteFromCart,
    { productId },
    () => refetch()
  );

  const addHandler = async () => {
    if (session?.status !== "authorized") {
      router.push("/login");
      return;
    }

    addRes();
  };

  const decreaseHandler = async () => {
    decreaseRes();
  };

  const deleteHandler = async () => {
    deleteRes();
  };

  useEffect(() => {
    if (session?.status === "authorized") refetch();
  }, [session?.status]);

  if (isError)
    return (
      <Tooltip title="Failed to fetch data!" placement="left">
        <Exclamation size={20} className="text-darkRose" />
      </Tooltip>
    );

  if (isLoading && isFetching)
    return (
      <div className="font-semibold w-[25%] py-2 rounded-lg flex justify-center bg-black text-white">
        <Loader h={20} w={20} color="#fff" />
      </div>
    );

  const isProductInCart = isInCart(productId, data?.cart?.selectedItems);
  const quantity = productQuantity(productId, data?.cart?.items);

  return (
    <div className="flex items-center gap-2 w-[25%]">
      {isProductInCart < 0 ? (
        <button
          type="button"
          className="font-semibold w-full py-2 rounded-lg flex justify-center bg-black text-white"
          onClick={addHandler}
          disabled={addLoading || isFetching || quantity >= stock}
        >
          {addLoading || isFetching ? (
            <Loader h={30} w={30} color="#fff" />
          ) : (
            <span className="iconSize">{icons.addToCart}</span>
          )}
        </button>
      ) : (
        <>
          <button
            type="button"
            className="bg-black text-white py-2 px-5 rounded-lg"
            onClick={addHandler}
            disabled={
              addLoading ||
              isFetching ||
              deleteLoading ||
              decreaseLoading ||
              quantity >= stock
            }
          >
            {addLoading ? (
              <Loader h={20} w={20} color="#fff" />
            ) : (
              <span>+</span>
            )}
          </button>
          <span className="w-[20px] text-center font-bold text-[1.5rem] mx-[15px]">
            {quantity}
          </span>
          {quantity > 1 ? (
            <button
              type="button"
              className="bg-black text-white py-2 px-5 rounded-lg"
              onClick={decreaseHandler}
              disabled={decreaseLoading || isFetching || deleteLoading}
            >
              {decreaseLoading ? (
                <Loader h={20} w={20} color="#fff" />
              ) : (
                <span>-</span>
              )}
            </button>
          ) : (
            <button
              type="button"
              className="bg-red-500 text-white py-[10px] px-4 rounded-lg"
              onClick={deleteHandler}
              disabled={deleteLoading || isFetching || decreaseLoading}
            >
              {deleteLoading ? (
                <Loader h={20} w={20} color="#fff" />
              ) : (
                <span>
                  <Trash />
                </span>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
