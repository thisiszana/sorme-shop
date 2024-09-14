import { OrderSorme } from "@/models/OrderSorme";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    await connectDB();

    const order = await OrderSorme.findById(id).lean();

    if (!order)
      return NextResponse.json(
        {
          msg: "order is not defiend",
          success: flase,
        },
        { status: 400 }
      );

    const response = NextResponse.json(
      {
        msg: "success",
        success: true,
        order,
      },
      { status: 200 }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params: { id } }) {
  try {
    await connectDB();

    const { status } = await req.json();

    // const session = getServerSession();

    // if (!session)
    //   return NextResponse.json(
    //     {
    //       msg: "un-authorized!",
    //       success: false,
    //     },
    //     { status: 404 }
    //   );

    const order = await OrderSorme.findById(id);

    if (!order)
      return NextResponse.json(
        {
          msg: "order is not defiend",
          success: flase,
        },
        { status: 400 }
      );

    order.status = status;
    await order.save();

    const res = NextResponse.json(
      { msg: "Order status updated", success: true },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
