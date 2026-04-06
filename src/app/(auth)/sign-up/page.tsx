import { Signup1 } from '@/components/signup1'


const page = () => {
  return (
    <div>
      <Signup1
      className=''
      logo={{
        url: "/",
        src: "/logo.png",
        alt: "My Logo",
        title: "My Website"
      }} />

    </div>
  )
}

export default page