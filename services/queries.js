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
