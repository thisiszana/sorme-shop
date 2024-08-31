import ProductsPage from "@/components/pages/products/ProductsPage";

export default function Products({ searchParams }) {
  return <ProductsPage searchParams={searchParams} />;
}

export const metadata = {
  title: `Products`,
};
