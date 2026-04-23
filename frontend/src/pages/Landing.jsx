import { useEffect } from "react";
import axios from "axios";
import Nav from "../components/site/Nav";
import Hero from "../components/site/Hero";
import About from "../components/site/About";
import Gallery from "../components/site/Gallery";
import Merch from "../components/site/Merch";
import Social from "../components/site/Social";
import Join from "../components/site/Join";
import Footer from "../components/site/Footer";
import Cursor from "../components/site/Cursor";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Landing() {
  useEffect(() => {
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
        <Gallery />
        <Merch />
        <Social />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
