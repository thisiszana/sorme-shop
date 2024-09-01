import RelatedProducts from "./ui/RelatedProducts";
import ProductComments from "./ui/ProductComments";
import ProductSection from "./ui/ProductSection";

export default function ProductDetailsPage({ id }) {
  return (
    <main className="lg:pt-[30px] space-y-[50px]">
      <ProductSection id={id} />
      <ProductComments id={id} />
      <RelatedProducts id={id} />
    </main>
  );
}
