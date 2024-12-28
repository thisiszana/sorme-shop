import api from "@/configs/api";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://admin-dahboard-shop.vercel.app"
    : "http://localhost:3001";


export const getSession = async () => {
  return api
    .get("/api/auth")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getUserCart = async () => {
  return api
    .get("/api/user/cart")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};
export const getUserCartData = async () => {
  return api
    .get("/api/user/data")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getShippingData = async () => {
  return api
    .get("/api/user/shipping-data")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getAllProducts = async () => {
  return api
    .get("/api/products")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};
export const getLatestProducts = async () => {
  return api
    .get("/api/latest-products")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching session data:", error);
      return null;
    });
};

export const getFilterProducts = async (searchParams) => {
  const query = new URLSearchParams(searchParams).toString();

  return api
    .get(`/api/filterProducts?${query}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching filtering products:", error);
      return null;
    });
};

export const getProduct = async (id) => {

  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  

  const responseData = await res.json();
    return responseData;
};
