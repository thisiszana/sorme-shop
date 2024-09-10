import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://admin-dahboard-shop.vercel.app/api/products",
      { timeout: 20000 }
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Failed to fetch product" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        message: "Success",
        status: "success",
        code: 200,
        products: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("allProducts error", error.message);
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
