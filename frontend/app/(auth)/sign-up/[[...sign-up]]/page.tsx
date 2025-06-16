import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center">
      <SignUp />
    </main>
  );
}
