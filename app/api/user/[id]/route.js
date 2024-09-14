import { CommentsSorme } from "@/models/CommentSorme";
import { OrderSorme } from "@/models/OrderSorme";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    await connectDB();
  } catch (error) {
    console.log("Cannot connect to DB!", error);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }

  try {
    const user = await UserSorme.findById(id)
      .select("-password")
      .populate({
        path: "orders",
        model: OrderSorme,
      })
      .populate({
        path: "comments",
        model: CommentsSorme,
      });


    const productsData = [];

    for (const comment of user.comments) {
      const productId = comment.productId.toString();

      try {
        const { data } = await axios.get(
          `https://admin-dahboard-shop.vercel.app/api/products/${productId}`
        );
        console.log("data comeback", data);
        productsData.push(data.product);
      } catch (error) {
        console.log(
          `Error fetching product with ID: ${productId}`,
          error.message
        );
      }
    }

    const combinedData = [
      {
        user,
        productsComment: productsData,
      },
    ];

    console.log("Combined user and products data:", combinedData);

    const response = NextResponse.json(
      { msg: "Success", success: true, data: combinedData },
      { status: 200 }
    );
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    return response;
  } catch (error) {
    console.log("Error:", error.message);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
