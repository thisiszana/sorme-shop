import { getCategories } from "@/actions/category.action";
import { shorterText } from "@/utils/fun";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const { categorie } = await getCategories();

  if (!categorie)
    return (
      <main className="w-full flex justify-center mt-[350px]">
        <p>Categories not found</p>
      </main>
    );

  console.log("categories", categorie);
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {categorie?.map((c) => (
        <Link
          key={c.name}
          className="w-fit p-3 cardShadow rounded-xl"
          href={`/products?category=${c.name.toLowerCase()}`}
        >
          <div>
            <Image
              src={c.image}
              width={500}
              height={500}
              alt={c.title}
              priority
              className="rounded-xl"
            />
          </div>
          <div className="px-2 pt-2">
            <p className="subtitle text-center">
              {shorterText(c.description, 20)}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}
