import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
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
    const users = await UserSorme.find();

    const response = NextResponse.json(
      { msg: "Success", success: true, users },
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
