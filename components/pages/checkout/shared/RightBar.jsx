import Loader from "@/components/shared/Loader";
import { calculateTotalDiscount, calculateTotalPrice } from "@/utils/fun";
import Link from "next/link";

export default function RightBar({
  cart,
  nextRoute,
  buttonTitle,
  buttonClassName,
  isLoading,
}) {
  console.log("right bar .....", cart.totalProductsCount);
  return (
    <section className="cardShadow3 rounded-xl p-6 pt-3 max-lg:w-full lg:w-1/4 divide-y-2 divide-gray-100">
      <div className="flex items-center w-full justify-between py-3">
        <p className="subtitle">Total Products: </p>
        <p className="subtitle">{cart.totalProductsCount}</p>
      </div>
      <div className="flex items-center w-full justify-between py-3">
        <p className="subtitle">Total Price: </p>
        <p className="subtitle">
          $ {calculateTotalPrice(cart.items).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center w-full justify-between py-3">
        <p className="subtitle">Total Discount: </p>
        <p className="subtitle">
          $ {calculateTotalDiscount(cart.items).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center w-full justify-between py-3">
        <p className="subtitle">Total Payable: </p>
        <p className="text-blue-500 font-bold">
          $
          {(
            calculateTotalPrice(cart.items) - calculateTotalDiscount(cart.items)
          ).toLocaleString()}
        </p>
      </div>
      {typeof buttonTitle === "string" ? (
        <Link
          href={`${nextRoute}`}
          className={`${
            buttonClassName || "border"
          } rounded-xl w-full flex justify-center py-3 mt-3 font-medium text-[15px]`}
        >
          {isLoading ? <Loader /> :  buttonTitle }
        </Link>
      ) : (
        buttonTitle
      )}
    </section>
  );
}
