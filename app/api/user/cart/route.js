import { NextResponse } from "next/server";
import { getServerSession } from "@/utils/session";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import axios from "axios";

export async function GET() {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return NextResponse.json({
        cart: null,
        message: "No Data! Un-Authorized",
        status: "success",
        code: 200,
      });

    const cart = await UserSorme.findById(session.userId).select("cart");

    if (!cart) {
      return NextResponse.json(
        {
          message: "User not found!",
          status: "failed",
          code: 404,
        },
        {
          status: 404,
        }
      );
    }

    const productIds = cart.cart.items.map((item) =>
      item.productId?.toString()
    );

    const products = [];
    try {
      for (let id of productIds) {
        const { data } = await axios.get(
          `https://admin-dahboard-shop.vercel.app/api/products/${id}`
        );

        products.push(data.product);
      }
    } catch (error) {
      console.error(
        `Error fetching product with id ${productIds}:`,
        error.message
      );
    }
    // console.log("product....", products)

    cart.cart.items.forEach((item) => {
      const productDetails = products.find(
        (product) => product._id === item.productId?.toString()
      );
      // console.log("product details", productDetails)
      if (productDetails) {
        item.productDetails = productDetails;
      }
    });
    // console.log("updated cart", cart.cart.items)

    await cart.save();

    const response = NextResponse.json({
      cart: cart.cart,
      message: "Fetched!",
      status: "success",
      code: 200,
    });

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      {
        message: "Server Error!",
        status: "failed",
        code: 500,
      },
      {
        status: 500,
      }
    );
  }
}
