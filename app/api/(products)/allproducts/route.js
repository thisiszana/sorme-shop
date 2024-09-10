import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://admin-dahboard-shop.vercel.app/api/products"
    );

    return NextResponse.json(
      {
        message: "Success",
        status: "success",
        code: 200,
        products: data,
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
