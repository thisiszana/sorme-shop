import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
import axios from "axios";
import { NextResponse } from "next/server";

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

    const user = await UserSorme.findById(session.userId).select([
      "username",
      "displayName",
      "phoneNumber",
      "address",
      "cart",
    ]);

    if (!user)
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

    const productIds = user.cart.items.map((item) =>
      item.productId?.toString()
    );

    const products = [];

    for (let id of productIds) {
      const { data } = await axios.get(
        `https://admin-dahboard-shop.vercel.app/api/products/${id}`
      );
      products.push(data.product);
    }

    user.cart.items.forEach((item) => {
      const productDetails = products.find(
        (product) => product._id === item.productId?.toString()
      );

      if (productDetails) item.productDetails = productDetails;
    });

    await user.save();

    return NextResponse.json({
      user,
      message: "Fetched",
      status: "success",
      code: 200,
    });
  } catch (error) {
    console.log("error messsage", error);
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
