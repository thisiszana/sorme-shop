import { CommentsSorme } from "@/models/CommentSorme";
import { getServerSession } from "@/utils/session";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return NextResponse.json(
        {
          message: "Un Authorized!",
          status: "failed",
          code: 422,
        },
        {
          status: 422,
        }
      );

    const user = await UserSorme.findById(session.userId).populate({
      path: "comments",
      model: CommentsSorme,
    });

    if (!user) {
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

    const cartItems = await Promise.all(
      user.cart.items.map(async (item) => {
        const { data: product } = await axios.get(
          `https://admin-dahboard-shop.vercel.app/api/products/${item.productId}`
        );
        return {
          ...item.toObject(),
          product,
        };
      })
    );

    console.log("cart Itmssssssss",cartItems);

    return NextResponse.json(
      {
        message: "Success",
        status: "success",
        code: 200,
        user,
        cartItems,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error .......................:", error.message);
    return NextResponse.json(
      {
        message: "Server error!",
        status: "failed",
        code: 500,
      },
      { status: 500 }
    );
  }
}
