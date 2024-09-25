"use client";

import { icons, images } from "@/constants";
import { getLatestProducts } from "@/services/queries";
import { QUERY_KEY } from "@/services/queriesKey";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import Slider from "react-slick";
import ProductCard from "../../products/ui/ProductCard";
import Loader from "@/components/shared/Loader";
import TextHeader from "@/components/shared/TextHeader";
import Link from "next/link";
import Image from "next/image";

export default function LatestProducts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.latest_products],
    queryFn: () => getLatestProducts(),
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 50 * 1000,
  });

  console.log(data);

  if (isLoading)
    return (
      <main className="flex justify-center items-center">
        <Loader />
      </main>
    );

  if (data?.code !== 200)
    return (
      <main className="flex justify-center items-center">
        <p>Failed to fetch data, Please try again</p>
      </main>
    );

  return (
    <>
      <div className="flex justify-between items-center">
        <TextHeader title="Latest Products" />
        <Link
          href="/products"
          className="link-hover pb-2"
        >
          View All Products
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-between gap-5">
        {data?.products?.products.map((product) => (
          <Fragment key={product._id}>
            <ProductCard {...product} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
