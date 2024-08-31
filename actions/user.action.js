"use server";

import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";

export const getUser = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const user = await UserSorme.findById(session.userId);

    if (!user)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    return {
      user,
      message: MESSAGES.success,
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

export const uppdateUser = async (req) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const { username, displayName, phoneNumber, address, gender } = req;
    const user = await UserSorme.findById(session.userId);

    if (!user)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (username !== session.username) {
      const checkedUsename = await UserSorme.findOne({ username });
      if (checkedUsename) {
        return {
          message: MESSAGES.user_exist,
          status: MESSAGES.failed,
          code: STATUS_CODES.exist,
        };
      }
    }

    user.username = username;
    user.displayName = displayName;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.gender = gender;

    await user.save();

    const accessToken = sign(
      { username, role: user.role, gender: user.gender, userId: user.id },
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
      user,
      message: MESSAGES.updateProfile,
      status: MESSAGES.success,
      status: STATUS_CODES.updated,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
