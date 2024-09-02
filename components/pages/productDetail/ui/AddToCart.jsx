"use client";

import useSession from "@/hooks/useSession";
import { useEffect } from "react";

export default function AddToCart() {
  const { data: session } = useSession();
  
  // useEffect(()=>{
  //   if (session?.status === "authorized")
  // },[])
  return <div>AddToCart</div>;
}
