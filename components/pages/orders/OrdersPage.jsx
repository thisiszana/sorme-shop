import { getUser } from "@/actions/user.action";

import ProfilePageHeader from "@/components/shared/ProfilePageHeader";
import MyOrders from "./ui/MyOrders";

export default async function OrdersPage() {
  const data = await getUser();
  console.log("order page data", data);
  if (data.code !== 200) {
    return <p>Error!</p>;
  }
  return (
    <>
      <ProfilePageHeader title="My Orders" />
      {/* <MyOrders orders={JSON.parse(JSON.stringify(data?.user?.orders))} /> */}
    </>
  );
}
