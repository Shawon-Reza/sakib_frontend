import { Navbar1 } from "@/components/navbar1";
import { Footer7 } from "@/components/footer7";
import { BookADemo2 } from "@/components/book-a-demo2";
import LocationMap from "@/components/map-component";
import { Hero3 } from "@/components/hero3";


const HomePage = () => {

  
  return (
    <div className="overflow-x-clip px-2 pt-24">

      <nav className="fixed inset-x-0 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <Navbar1 />
      </nav>
      <nav className="scale-100 ">
        <Hero3 />
      </nav>

      {/* ============= Contact Us Page ============== */}
      <section>
        <BookADemo2 />
      </section>
      {/* ============= Map ============== */}
      <footer className="mb-20 max-h-[400px] overflow-hidden rounded-lg">
        <LocationMap />
      </footer>
      {/* ============= Footer ============== */}
      <footer>
        <Footer7 />
      </footer>

    </div>
  )
}

export default HomePage