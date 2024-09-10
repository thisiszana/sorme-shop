import { OrderSorme } from "@/models/OrderSorme";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return NextResponse.json(
        {
          msg: "un-authorized!",
          success: false,
        },
        { status: 404 }
      );

    const order = await OrderSorme.findById(id).lean();

    if (!order)
      return NextResponse.json(
        {
          msg: "order is not defiend",
          success: flase,
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        msg: "success",
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
