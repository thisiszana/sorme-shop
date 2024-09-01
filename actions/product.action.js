"use server";

export const getProduct = async (id) => {
  try {
    const response = await fetch(
      `https://admin-dahboard-shop.vercel.app/api/products/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }

    const product = await response.json();

    return {
      product,
      status: "success",
      code: 200,
    };
  } catch (error) {
    return {
      product: null,
      status: "failed",
      code: 500,
    };
  }
};
