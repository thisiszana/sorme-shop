"use server";

import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { hashPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";

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
