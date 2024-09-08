"use client";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import { createOrder } from "@/actions/order.action";

import { QUERY_KEY } from "@/services/queriesKey";

import useServerAction from "@/hooks/useServerAction";

import Loader from "@/components/shared/Loader";

export default function PayButton({ data }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { loading, res } = useServerAction(createOrder, data, () => {
    queryClient.invalidateQueries(QUERY_KEY.user_data);
    router.push("/profile/orders");
  });
  return (
    <button
      onClick={res}
      disabled={loading}
      className={`${
        loading ? "bg-gray-100" : "bg-green-500 text-white"
      } w-full py-3 rounded-xl flex justify-center items-center`}
    >
      {loading ? <Loader /> : "Pay off"}
    </button>
  );
}
