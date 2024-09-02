"use client";

import useSession from "@/hooks/useSession";

export default function AddToCart() {
  const { data: session } = useSession();
  console.log(session);
  return <div>AddToCart</div>;
}
