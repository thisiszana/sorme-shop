import { getUser } from "@/actions/user.action";
import ProfilePagesTitle from "../shared/ProfilePagesTitle";
import InfoForm from "./InfoForm";

export default async function PersonalInformationPage() {
  const user = await getUser();

  return (
    <>
      <ProfilePagesTitle title="Personal Information" />
      <InfoForm {...JSON.parse(JSON.stringify(user))} />
    </>
  );
}
