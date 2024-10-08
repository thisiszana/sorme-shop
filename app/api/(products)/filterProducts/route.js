import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const res = await axios.get(
      `https://admin-dahboard-shop.vercel.app/api/products?${query}`,
      { timeout: 20000 }
    );

    if (res.status !== 200) {
      return NextResponse.json(
        { message: "Failed to fetch filtering products" },
        { status: res.status }
      );
    }

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
    console.error("Error fetching filtering products:", error);
    return NextResponse.json(
      { message: "Server error while filtering products" },
      { status: 500 }
    );
  }
}
