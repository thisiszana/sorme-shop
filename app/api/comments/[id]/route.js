import { CommentsSorme } from "@/models/CommentSorme";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
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
    const comments = await CommentsSorme.findById(id)
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

export async function POST(req, { params }) {
  try {
    await connectDB();

    const { action, value } = await req.json();
    const { id: _id } = params;

    const comment = await CommentsSorme.findById(_id);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found", status: "failed", code: 404 },
        { status: 404 }
      );
    }

    switch (action) {
      case "publish": {
        comment.published = true;
        await comment.save();
        break;
      }
      case "draft": {
        comment.published = false;
        await comment.save();
        break;
      }
      case "answer": {
        comment.answer = value;
        comment.status = value.length !== 0 ? "Answered" : "Not-Answered";
        await comment.save();
        break;
      }
      case "delete": {
        const user = await UserSorme.findById(comment.senderId);

        if (!user) {
          return NextResponse.json(
            {
              message: " User not found",
              status: "failed",
              code: 404,
            },
            { status: 404 }
          );
        }
        const user_comment_index = user.comments.findIndex((item) =>
          item.equals(_id)
        );
        user.comments.splice(user_comment_index, 1);
        await user.save();

        await CommentsSorme.findByIdAndDelete(_id);
        break;
      }
      default:
        return NextResponse.json(
          { message: "Invalid action", status: "failed", code: 400 },
          { status: 400 }
        );
    }

    const res = NextResponse.json(
      {
        message: "Action completed successfully",
        status: "success",
        code: 200,
      },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (error) {
    console.log("API Error:", error.message);
    return NextResponse.json(
      { message: "Server Error!", status: "failed", code: 500 },
      { status: 500 }
    );
  }
}
