import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => await hash(password, 12);
