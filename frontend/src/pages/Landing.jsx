import { useEffect } from "react";
import axios from "axios";
import Nav from "../components/site/Nav";
import Hero from "../components/site/Hero";
import About from "../components/site/About";
import RoutesCarousel from "../components/site/RoutesCarousel";
import Gallery from "../components/site/Gallery";
import Events from "../components/site/Events";
import Social from "../components/site/Social";
import Join from "../components/site/Join";
import Footer from "../components/site/Footer";
import Cursor from "../components/site/Cursor";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Landing() {
  useEffect(() => {
    // Light ping to warm up backend; non-blocking.
    axios.get(`${API}/`).catch(() => {});
  }, []);

  return (
    <div className="relative bg-ink-950 text-ink-50 font-body min-h-screen overflow-x-hidden">
      <div className="grain-layer" aria-hidden />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <RoutesCarousel />
        <Gallery />
        <Events />
        <Social />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
