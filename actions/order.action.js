"use server";

import { OrderSorme } from "@/models/OrderSorme";
import { UserSorme } from "@/models/UserSorme";
import { connectDB } from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const createOrder = async (data) => {
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

    if (user.cart.totalProductsCount === 0)
      return {
        message: "Cart is Empty",
        status: "failed",
        code: 404,
      };

    const {
      userData: { deliveryAddress, userId, phoneNumber, displayName },
      paymentMethod,
      items,
      summary,
    } = data;

    const newOrder = await OrderSorme.create({
      deliveryAddress,
      userId,
      phoneNumber,
      displayName,
      paymentMethod,
      items: items.map((item) => ({
        ...item,
        cost: item.productDetails.price,
        discount: item.productDetails.discount,
      })),
      summary,
    });

    for (let item of items) {
      try {
        const { data: product } = await axios.get(
          `https://admin-dahboard-shop.vercel.app/api/products/${item.productId}`
        );
        console.log("product payment .... 1", product.product);
        product.product.stock -= item.quantity;
        product.product.orders = product.product.orders || [];
        product.product.orders.push({
          orderId: newOrder._id,
          quantity: item.quantity,
        });

        const patchResponse = await axios.patch(
          `https://admin-dahboard-shop.vercel.app/api/products/${item.productId}`,
          { stock: product.product.stock, orders: product.product.orders }
        );

        if (patchResponse.status !== 200) {
          throw new Error("Failed to update product");
        }
      } catch (error) {
        console.error("Error updating product:", error);

        return {
          message: `Error updating product ${item.productId}: ${error.message}`,
          status: "failed",
          code: 500,
        };
      }
    }

    user.orders.push(newOrder._id);

    user.cart = {
      items: [],
      selectedItems: [],
      totalProductsCount: 0,
      checkoutStatus: "pending",
    };

    await user.save();

    revalidatePath("/profile");

    return {
      message: "Order completed",
      status: "success",
      code: 200,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getUserOrders = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const orders = await UserSorme.findById(session.userId)
      .populate({
        path: "orders",
        model: OrderSorme,
      })
      .select("orders");

    return {
      orders,
      status: "success",
      code: 200,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getOrderDetails = async (id) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const order = await OrderSorme.findOne({ _id: id }).lean();

    const productDetails = [];
    for (let item of order.items) {
      try {
        const product = await axios.get(
          `https://admin-dahboard-shop.vercel.app/api/products/${item.productId.toString()}`
        );
        console.log("Product data:", product.data);
        productDetails.push({ ...item, product: product.data });
      } catch (error) {
        console.error(`Error fetching details for product ${item.productId}:`, error);
      }
    }

    console.log("Product Details:", productDetails);

    return {
      message: "Order details retrieved successfully",
      status: MESSAGES.success,
      code: 200,
      order: {
        ...order,
        items: productDetails,
      },
    };
  } catch (error) {
    console.log("Server error:", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};


