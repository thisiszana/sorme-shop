"use client";

import { useQuery } from "@tanstack/react-query";

import EmptyCart from "@/components/shared/cart/EmptyCart";
import CartProductCard from "../shared/CartProductCard";
import CheckoutSteps from "../shared/CheckoutSteps";
import { QUERY_KEY } from "@/services/queriesKey";
import { getUserCart } from "@/services/queries";
import Loader from "@/components/shared/Loader";
import RightBar from "../shared/RightBar";

export default function CartPage() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user_cart],
    queryFn: getUserCart,
    cacheTime: 0,
    staleTime: 0,
  });

  if (isLoading)
    return (
      <main className="w-full flex justify-center mt-[350px]">
        <Loader />
      </main>
    );

  if (data?.code !== 200) return <p>Error!</p>;

  if (data?.cart?.totalProductsCount === 0) return <EmptyCart />;
console.log(data.cart)
  return (
    <>
      <CheckoutSteps />
      <main className="flex gap-[20px] max-lg:flex-col lg:items-start">
        <section className="max-lg:w-full lg:w-3/4 space-y-[20px]">
          {data.cart.items.map((el) => (
            <CartProductCard key={el._id} {...el} />
          ))}
        </section>
        <RightBar
          cart={data.cart}
          nextRoute="/checkout/shipping"
          buttonTitle="Submit Orders"
          buttonClassName="bg-blue-500 text-white"
          isLoading={isLoading}
        />
      </main>
    </>
  );
}
