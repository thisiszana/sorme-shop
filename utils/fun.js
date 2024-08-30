import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashPass) =>
  await compare(password, hashPass);
