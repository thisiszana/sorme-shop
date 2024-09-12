import { CommentsSorme } from "@/models/CommentSorme";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
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
    const comments = await CommentsSorme.find()
      .populate({
        path: "senderId",
        model: UserSorme,
        select: "image username displayName",
      })
      .lean();

    return NextResponse.json({
      comments,
      message: "success",
      status: "success",
      code: 200,
    });
  } catch (error) {
    console.log("comments error", error.message);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
