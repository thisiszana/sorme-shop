"use server";

import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/cookies";
import { hashPassword, verifyPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

export const createUser = async (req) => {
  try {
    await connectDB();

    const { username, password } = req;

    if (!username || !password)
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const existingUser = await UserSorme.findOne({ username });

    if (existingUser)
      return {
        message: MESSAGES.user_exist,
        status: MESSAGES.failed,
        code: STATUS_CODES.exist,
      };

    const hashedPassword = await hashPassword(password);

    await UserSorme.create({
      username,
      password: hashedPassword,
    });

    return {
      message: MESSAGES.register,
      status: MESSAGES.success,
      code: STATUS_CODES.created,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const loginUser = async (req) => {
  try {
    await connectDB();

    const { username, password } = req;

    if (!username || !password)
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const user = await UserSorme.findOne({ username });

    if (!user)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const isValidPass = await verifyPassword(password, user.password);

    if (!isValidPass)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.exist,
      };

    const accessToken = sign(
      { username, role: user.role, userId: user._id },
      SECRET_KEY,
      {
        expiresIn: SESSION_EXPIRATION,
      }
    );

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + SESSION_EXPIRATION),
      sameSite: "lax",
      path: "/",
    });

    return {
      message: MESSAGES.login,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
