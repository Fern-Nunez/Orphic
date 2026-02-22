import LoaderOverlay from "./assets/loader/loader";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import Collection from "./components/collection/collection";
import CTA from "./components/cta/cta";
import Footer from "./components/footer/footer";
import "./main.css";

export default function Home() {
  return (
    <main>
      <LoaderOverlay />
      <Navbar />
      <Hero />
      <About />
      <Collection />
      <CTA />
      <Footer />
    </main>
  );
}
