"use client";

import HomePage from "@/components/pages/home/HomePage";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

export const dynamic = "force-dynamic";

export default function Home() {
  useEffect(() => {
    AOS.init({duration: 1000});
    AOS.refresh();
  }, []);
  return <HomePage />;
}
