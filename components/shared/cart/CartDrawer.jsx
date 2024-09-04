"use client";

import Link from "next/link";
import { Fragment } from "react";
import { Drawer } from "antd";
import { Close } from "@/components/icons/Icons";
import CartItemCard from "./CartItemCard";
import { icons } from "@/constants";
import EmptyCart from "./EmptyCart";

export default function CartDrawer({ openCart, setOpenCart, cart, session }) {
  const closeDrawer = () => {
    setOpenCart(false);
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="iconSize">{icons.basket}</div>
            <span>{cart.cart?.totalProductsCount} Items</span>
          </div>
          <button type="button" onClick={() => closeDrawer()}>
            <Close />
          </button>
        </div>
      }
      placement="right"
      onClose={closeDrawer}
      open={openCart}
      closeIcon={false}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "30px",
        },
      }}
    >
      {!cart || !cart.cart?.items || cart.cart.items.length === 0 ? (
        <main>
          <EmptyCart />
        </main>
      ) : (
        <>
          <div className="space-y-[25px]">
            {cart.cart.items.map((el, i) => (
              <Fragment key={el?._id}>
                <CartItemCard {...el} />
                {i < cart.cart.items.length - 1 && (
                  <div className="w-full h-[1px] bg-gray-100" />
                )}
              </Fragment>
            ))}
          </div>
          <Link
            onClick={closeDrawer}
            href="/checkout/cart"
            className="bg-red-500 text-white rounded-lg py-2 w-full text-center hover:text-white"
          >
            View Cart
          </Link>
        </>
      )}
    </Drawer>
  );
}
