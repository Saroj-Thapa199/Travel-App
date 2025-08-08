import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfilePage from "./ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const page = async () => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return redirect("/");
  }

  return <ProfilePage userId={session.user.id} />;
};

export default page;
