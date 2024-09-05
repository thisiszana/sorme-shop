import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return NextResponse.json(
        {
          message: "Un Authorized!",
          status: "failed",
          code: 422,
        },
        {
          status: 422,
        }
      );

      // ...
  } catch (error) {}
}
