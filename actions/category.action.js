"use server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import axios from "axios";

export const getCategories = async () => {
  try {
    const res = await axios.get(
      "https://admin-dahboard-shop.vercel.app/api/category"
    );

    return {
      categories: res.data,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log(error.message)
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
