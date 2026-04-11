import { Login1 } from "@/components/login1";

export default function Login() {
  return (
    <Login1
      logo={{
        url: "/",
        src: "/logo.png",
        alt: "My Logo",
        title: "My Website",
      }}
      signupUrl="/sign-up"
    />
  );
}