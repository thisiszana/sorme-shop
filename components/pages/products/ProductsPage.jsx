"use client";

import Loader from "@/components/shared/Loader";
import { QUERY_KEY } from "@/services/queriesKey";
import { useQuery } from "@tanstack/react-query";
import FilterProducts from "./ui/FilterProducts";
import SearchProducts from "./ui/SearchProducts";
import ProductCard from "./ui/ProductCard";
import Pagination from "./ui/Pagination";
import { getAllProducts, getFilterProducts } from "@/services/queries";

export default function ProductsPage({ searchParams }) {
  const { data: allProducts, isLoading: isLoadingAll } = useQuery({
    queryKey: [QUERY_KEY.products],
    queryFn: getAllProducts,
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 10000,
  });

  const { data: filteredProduct, isLoading: isLoadingFilered } = useQuery({
    queryKey: [QUERY_KEY.filteredProducts, searchParams],
    queryFn: () => getFilterProducts(searchParams),
    gcTime: 0,
    staleTime: 0,
    refetchInterval: 10000,
  });

  if (isLoadingAll || isLoadingFilered)
    return (
      <main className="w-full flex justify-center mt-[350px]">
        <Loader />
      </main>
    );

  const productsToShow =
    searchParams && Object.keys(searchParams).length > 0
      ? filteredProduct
      : allProducts;

  return (
    <main>
      <div className="flex items-center gap-2 w-full mb-[20px]">
        <FilterProducts />
        <SearchProducts />
      </div>
      {productsToShow?.products.length !== 0 ? (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[15px]">
            {productsToShow?.products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </section>
          <Pagination
            totalPages={productsToShow?.totalPages}
            searchParams={searchParams}
          />
        </>
      ) : (
        <h1>No Products yet!</h1>
      )}
    </main>
  );
}
