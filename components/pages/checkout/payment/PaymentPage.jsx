"use client"

import { icons } from "@/constants";
import { useState } from "react";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const payment = [
    {
      value: "Credit Card",
      icon: icons.creditCard,
      title: "Pay with Credit Card",
    },
    {
      value: "Paypal",
      icon: icons.paypal,
      title: "Pay with Paypal",
    },
    {
      value: "Cash On Delivery",
      icon: icons.handShake,
      title: "Cash On Delivery",
    },
  ];


  return (
    <div>PaymentPage</div>
  )
}
