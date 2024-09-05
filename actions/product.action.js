"use server";

import { CommentsSorme } from "@/models/CommentSorme";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import axios from "axios";

export const addProductComment = async (data) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const {
      form: { title, description },
      productId,
      userId,
    } = data;

    const user = await UserSorme.findById(userId);
    const newComment = await CommentsSorme.create({
      title,
      description,
      productId,
      senderId: userId,
    });

    await axios.post(
      `https://admin-dahboard-shop.vercel.app/api/products/${productId}`,
      { commentId: newComment._id }
    );

    console.log(user)

    await user.comments.push(newComment._id);
    await user.save();

    return {
      message: MESSAGES.addComment,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error ....", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getProductComment = async (id) => {
  try {
    await connectDB();
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
