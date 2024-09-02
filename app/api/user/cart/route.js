import { NextResponse } from "next/server";

import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
import { UserSorme } from "@/models/UserSorme";

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

    const cart = await UserSorme.findById(session.userId)
      .select("cart")
      

    if (!cart)
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

    return NextResponse.json({
      cart: cart.cart,
      message: "Fetched!",
      status: "success",
      code: 200,
    });
  } catch (error) {
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
