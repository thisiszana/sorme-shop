import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashPass) =>
  await compare(password, hashPass);

export const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const shorterText = (text, maxCharacter) => {
  if (String(text).length > maxCharacter) {
    return `${text.substring(0, maxCharacter)}...`;
  } else {
    return text;
  }
};
