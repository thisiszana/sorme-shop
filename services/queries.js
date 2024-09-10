import api from "@/configs/api";

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
  return api
    .get(`/api/detailsProduct/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching filtering products:", error);
      return null;
    });
};
