import { notFound } from "next/navigation";

import ProductDetailsPage from "@/components/pages/productDetail/ProductDetailsPage";

import { getProduct } from "@/services/queries";

export default function ProductsDetail({ params }) {
  return <ProductDetailsPage id={params.id} />;
}

export async function generateMetadata({ params }) {
  const data = await getProduct(params.id);

  if (!data) {
    notFound();
  }

  return {
    title: {
      absolute: data.product.product.title,
    },
    description: data.product.product.description,
    keywords: data.product.product.keywords,
  };
}
