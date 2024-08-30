import { cookies } from "next/headers";

import { SECRET_KEY } from "./cookies";

import { verify } from "jsonwebtoken";

export const getServerSession = () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken").value;

    const session = verify(accessToken, SECRET_KEY);

    return session;
  } catch (error) {
    return null;
  }
};
