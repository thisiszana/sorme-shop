import api from "@/configs/api";

export const getSession = () => api.get("/api/auth").then((res) => res.json);

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
