"use server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { connectDB } from "@/utils/connectDB";
import { UserSorme } from "@/models/UserSorme";
import axios from "axios";

export const addToCart = async (data) => {
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

    const { productId } = data;

    const product = await axios.get(
      `https://admin-dahboard-shop.vercel.app/api/products/${productId}`
    );

    if (product.stock === 0)
      return {
        message: MESSAGES.productOutStock,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const existingCartItemIndex = user.cart.items.findIndex((item) =>
      item.productId?.equals(productId)
    );

    if (existingCartItemIndex !== -1) {
      if (product.stock === user.cart.items[existingCartItemIndex].quantity) {
        return {
          message: MESSAGES.productOutStock,
          status: MESSAGES.failed,
          code: STATUS_CODES.not_found,
        };
      } else {
        user.cart.items[existingCartItemIndex].quantity += 1;
      }
    } else {
      user.cart.items.push({ productId, quantity: 1 });
    }

    user.cart.selectedItems = user.cart.items.map((item) => item.productId);
    user.cart.totalProductsCount = user.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    await user.save();

    return {
      message: MESSAGES.addProduct,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error ocured", error.message)
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const decreaseFromCart = async (data) => {
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

    const { productId } = data;

    const existingCartItemIndex = user.cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (user.cart.items[existingCartItemIndex].quantity === 1) {
      user.cart.items.split(existingCartItemIndex, 1);
    } else {
      user.cart.items[existingCartItemIndex].quantity -= 1;
    }

    user.cart.selectedItems = user.cart.items.map((item) => item.productId);
    user.cart.totalProductsCount = user.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    await user.save();

    return {
      message: MESSAGES.decreasedProduct,
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

export const deleteFromCart = async (data) => {
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

    const { productId } = data;

    const existingCartItemIndex = user.cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    user.cart.items.splice(existingCartItemIndex, 1);

    user.cart.selectedItems = user.cart.items.map((item) => item.productId);
    user.cart.totalProductsCount = user.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    await user.save();

    return {
      message: MESSAGES.deleteProduct,
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
