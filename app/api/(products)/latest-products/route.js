import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await axios.get(
      "https://admin-dahboard-shop.vercel.app/api/latest-products"
    );

    if (res.status !== 200) {
      return NextResponse.json(
        { message: "Failed to fetch Latest products" },
        { status: res.status }
      );
    }

    console.log("latest products server", res.data);

    const response = NextResponse.json(
      {
        message: "Success",
        status: "success",
        code: 200,
        products: res.data,
      },
      { status: 200 }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching Latest products:", error.message);
    return NextResponse.json(
      { message: "Server error while Latest products" },
      { status: 500 }
    );
  }
}
