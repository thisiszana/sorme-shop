import { OrderSorme } from "@/models/OrderSorme";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const orders = await OrderSorme.find()
      .populate({
        path: "userId",
        model: UserSorme,
      })
      .lean();

    const response =  NextResponse.json({
      orders,
      message: "success",
      status: "success",
      code: 200,
    });

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
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
