import Image from "next/image";
import Link from "next/link";

import moment from "moment";

import TextHeader from "@/components/shared/TextHeader";
import { getProduct } from "@/actions/product.action";
import { reducePrice, shorterText } from "@/utils/fun";
import AddToCart from "./AddToCart";

export default async function ProductSection({ id }) {
  const product = await getProduct(id);

  const { _id, title, image, price, stock, discount, description, category } =
    product?.product.product;

    console.log("product .....", product.product.product)
  return (
    <>
      <section className="flex max-lg:flex-col gap-5">
        <div className="w-full lg:w-[50%] flex justify-center items-center bg-gray-100 rounded-lg p-4 relative">
          <Image
            src={image}
            width={400}
            height={400}
            alt={title}
            priority
            className="max-md:w-[250px] max-w-[400px] max-h-[400px] object-cover"
          />
        </div>
        <div className="space-y-2 lg:w-[50%]">
          <h1 className="font-black text-[30px]">{title}</h1>

          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              href={"/"} // کار داره هنوز
              className="capitalize font-medium"
            >
              {category}
            </Link>
            <p className="text-gray-300">|</p>
            {stock > 0 ? (
              <p className="text-green-500">In Stock</p>
            ) : (
              <p className="text-red-500">Out of stock!</p>
            )}
            {stock > 0 && stock <= 10 && (
              <>
                <p className="text-gray-300">|</p>
                <p className="text-red-600 font-medium text-[12px]">
                  Only {stock} Remains
                </p>
              </>
            )}
          </div>

          <div>
            {stock > 0 && (
              <>
                <div className="flex items-center gap-5 mb-[20px]">
                  <h1 className="text-blue-500 font-bold text-[30px]">
                    $ {reducePrice(discount, price).toLocaleString()}
                  </h1>
                  {discount > 0 && (
                    <span className="text-gray-400 line-through text-[15px]">
                      {price.toLocaleString()}
                    </span>
                  )}
                </div>
              </>
            )}
            {description && (
              <div>
                <h3 className="font-bold text-[17px]">Description</h3>
                <p>{shorterText(description, 500)}</p>
              </div>
            )}
            {stock > 0 && (
              <AddToCart productId={JSON.parse(JSON.stringify(_id))} />
            )}
            {stock === 0 && (
              <div className="flex justify-center bg-gray-200 rounded-xl py-3 mt-2">
                <p className="font-bold">Out of stock!</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Reviews {...product.product.product} />
    </>
  );
}

const Reviews = (props) => {
  const {
    price,
    stock,
    discount,
    category,
    brand,
    // likes,
    // comments,
    // orders,
    createdAt,
    description,
  } = props;

  return (
    <section>
      <TextHeader title="Product Review" />
      <ul className="ml-[20px]">
        <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Price: </p>
          <div className="font-light text-[14px] flex items-center gap-2">
            <p>$ {reducePrice(discount, price).toLocaleString()}</p>
            {discount > 0 && (
              <>
                <span>|</span>
                <p className="line-through text-[12px] font-light">
                  {price.toLocaleString()}
                </p>
              </>
            )}
          </div>
        </li>
        <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Discount: </p>
          <p className="font-light text-[14px]">% {discount}</p>
        </li>
        <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Stock: </p>
          <p className="font-light text-[14px]">{stock?.toLocaleString()}</p>
        </li>
        <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Category: </p>
          <p className="font-light text-[14px] capitalize">{category}</p>
        </li>
        <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Brand: </p>
          <p className="font-light text-[14px] capitalize">{brand}</p>
        </li>
        {/* <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Likes: </p>
          <p className="font-light text-[14px]">
            {likes.length.toLocaleString()}
          </p>
        </li> */}
        {/* <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Comments: </p>
          <p className="font-light text-[14px]">
            {comments.length.toLocaleString()}
          </p>
        </li> */}
        {/* <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Orders: </p>
          <p className="font-light text-[14px]">
            {orders.length.toLocaleString()}
          </p>
        </li> */}
        <li className="flex items-center gap-2">
          <p className="font-semibold text-[14px]">Created At: </p>
          <p className="font-light text-[14px] capitalize">
            {moment(createdAt).fromNow()}
          </p>
        </li>
        {description && (
          <li className="flex gap-2">
            <p className="font-semibold text-[14px]">Description: </p>
            <p className="font-light text-[14px]">{description}</p>
          </li>
        )}
      </ul>
    </section>
  );
};
