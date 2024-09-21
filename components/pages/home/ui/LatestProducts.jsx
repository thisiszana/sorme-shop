"use client";

import { icons } from "@/constants";
import { getLatestProducts } from "@/services/queries";
import { QUERY_KEY } from "@/services/queriesKey";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import Slider from "react-slick";
import ProductCard from "../../products/ui/ProductCard";
import Loader from "@/components/shared/Loader";
import TextHeader from "@/components/shared/TextHeader";
import Link from "next/link";

export default function LatestProducts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.latest_products],
    queryFn: () => getLatestProducts(),
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 50 * 1000,
  });

  console.log(data);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center">
        <Loader />
      </main>
    );
  }

  if (data?.code !== 200) {
    return (
      <main className="flex justify-center items-center">
        <p>Failed to fetch data, Please try again</p>
      </main>
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: icons.rightArrow,
    prevArrow: icons.leftArrow,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <TextHeader title="Latest Products" />
        <Link
          href="/products"
          className="bg-white py-2 px-6 sm:py-3 sm:px-8 md:py-3 md:px-10 rounded-lg"
        >
          All Products
        </Link>
      </div>
      <Slider {...settings}>
        {data?.products.map((product) => (
          <Fragment key={product._id}>
            <ProductCard {...product} />
          </Fragment>
        ))}
      </Slider>
    </>
  );
}
