import api from "@/configs/api";

export const getSession = () => {
  return api
    .get("/api/auth")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getUserCart = () => {
  return api
    .get("/api/user/cart")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};
export const getUserCartData = () => {
  return api
    .get("/api/user/data")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getShippingData = () => {
  return api
    .get("/api/user/shipping-data")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(
      "https://admin-dahboard-shop.vercel.app/api/products"
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getFilterProducts = async (searchParams) => {
  const query = new URLSearchParams(searchParams);

  try {
    const res = await fetch(
      `https://admin-dahboard-shop.vercel.app/api/products?${query}`
    );

    if (!res.ok) throw new Error("Failed to fetch filtering products");

    return res.json();
  } catch (error) {
    console.error("Error fetching filtering products:", error);
    return null;
  }
};

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
