import { NextResponse } from "next/server";
import axios from "axios";
import { MESSAGES, STATUS_CODES } from "@/utils/message";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await axios.get(
      `https://admin-dahboard-shop.vercel.app/api/products/${id}`
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Failed to fetch product" },
        { status: response.status }
      );
    }

    const res = NextResponse.json(
      {
        product: response.data,
        message: MESSAGES.success,
        status: MESSAGES.success,
        code: STATUS_CODES.success,
      },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        message: MESSAGES.server,
        status: MESSAGES.failed,
        code: STATUS_CODES.server,
      },
      { status: 500 }
    );
  }
}
