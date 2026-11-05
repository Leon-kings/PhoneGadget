import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { Hero } from './components/hero/Hero';
import { Navbar } from './components/navbar/Navbar';
import { About } from './pages/about/About';
import { Market } from './pages/market/Market';
import { Services } from './pages/services/Services';
import { NotFound } from './pages/notfound/NotFound';

// Home page combines Hero + preview sections
function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Market />
    </>
  );
}

export default function App() {
  return (
    <>
      <div className="w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/market" element={<Market />} />
          {/* Optional: 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

