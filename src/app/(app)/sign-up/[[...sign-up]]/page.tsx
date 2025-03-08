import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
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
