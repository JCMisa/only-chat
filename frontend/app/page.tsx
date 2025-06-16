import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const id = await auth();

  if (id) {
    redirect("/dashboard");
  } else {
    redirect("/sign-in");
  }
  return <></>;
}
