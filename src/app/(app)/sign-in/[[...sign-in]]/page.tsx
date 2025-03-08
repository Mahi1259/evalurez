import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#7F4AD7",
          },
        }}
      />
    </div>
  );
}
