import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashPass) =>
  await compare(password, hashPass);

export const isInCart = (productId, selectedItems) => {
  if (selectedItems) {
    const existingIndex = selectedItems.findIndex((item) => item === productId);
    return existingIndex;
  } else {
    return -1;
  }
};

export const productQuantity = (productId, cartItems) => {
  if (!cartItems) return 0;
  const item = cartItems.find((item) => item.productId === productId);
  return item ? item.quantity : 0;
};

export const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const shorterText = (text, maxCharacter) => {
  if (String(text).length > maxCharacter) {
    return `${text.substring(0, maxCharacter)}...`;
  } else {
    return text;
  }
};

export const reducePrice = (discount, price) => {
  const discountValue = (price * discount) / 100;
  const finalValue = price - discountValue;
  return finalValue;
};

export const calculateTotalPrice = (items) => {
  return items.reduce(
    (prev, current) => prev + current.productDetails.price * current.quantity,
    0
  );
};

export const calculateTotalDiscount = (items) => {
  return items.reduce(
    (prev, current) =>
      prev +
      (current.quantity *
        (current.productDetails.price * current.productDetails.discount)) /
        100,
    0
  );
};
