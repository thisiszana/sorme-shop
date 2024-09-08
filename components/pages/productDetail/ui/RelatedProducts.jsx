import { getRelatedProducts } from "@/actions/product.action";
import TextHeader from "@/components/shared/TextHeader";
import ProductCard from "../../products/ui/ProductCard";

export default async function RelatedProducts({ id }) {
  const data = await getRelatedProducts(id);
  return (
    <section>
      <div className="textHeaderPosition">
        <TextHeader title="Related Products" />
      </div>
      {data.relatedProducts.relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.relatedProducts.relatedProducts.map((el) => (
            <ProductCard {...el} key={el._id} />
          ))}
        </div>
      ) : (
        <p className="text-center subtitle">No Products Yet!</p>
      )}
    </section>
  );
}
