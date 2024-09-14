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
        select: "-password",
      })
      .lean();

    const res = NextResponse.json({
      orders,
      message: "success",
      status: "success",
      code: 200,
    });

    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
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
