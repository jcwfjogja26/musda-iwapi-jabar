import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import EventDetails from "../components/EventDetails";
import Market from "../components/Market";
import Partnership from "../components/Partnership";
import Hotel from "../components/Hotel";
import BandrosTour from "../components/BandrosTour";
import Location from "../components/Location";
import TactLink from "../components/Tactlink";
import Footer from "../components/Footer";



export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <EventDetails />
      <Market />
      <Partnership />
      <Hotel />
      <BandrosTour />
      <Location />
      <TactLink />
      <Footer />
    </main>
  );
}