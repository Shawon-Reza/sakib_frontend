
import { Signup2 } from "@/components/signup2";

const page = () => {
  return (
    <Signup2
      logo={{
        url: "/",
        src: "/logo.png",
        alt: "My Logo",
        title: "My Website",
      }}
      loginUrl="/sign-in"
    />
  )
}

export default page