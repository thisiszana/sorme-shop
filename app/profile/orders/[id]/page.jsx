import { shorterText } from "@/utils/fun";

import OrderDetailsPage from "@/components/profiles/orders/orderDetails/OrderDetailsPage";

export default function OrderDetails({ params: { id } }) {
  return <OrderDetailsPage id={id} />;
}

export async function generateMetadata({ params: { id } }) {
  return {
    title: `Orders | ${shorterText(id, 10)}`,
  };
}
