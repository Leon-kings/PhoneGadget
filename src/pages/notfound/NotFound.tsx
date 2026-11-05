// src/pages/not-found/NotFound.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Storefront as StorefrontIcon,
  Build as BuildIcon,
  Info as InfoIcon,
  WhatsApp as WhatsAppIcon,
  ErrorOutlined as ErrorOutlinedIcon,
 
} from '@mui/icons-material';

/* ============================================================
   CONSTANTS
   ============================================================ */
const WHATSAPP_NUMBER = '250787878787';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Samsung Store, I'm having trouble finding a page on your website. Can you help?"
)}`;

const QUICK_LINKS = [
  { label: 'Home', href: '/', icon: <HomeIcon fontSize="small" /> },
  { label: 'Market', href: '/market', icon: <StorefrontIcon fontSize="small" /> },
  { label: 'Services', href: '/services', icon: <BuildIcon fontSize="small" /> },
  { label: 'About', href: '/about', icon: <InfoIcon fontSize="small" /> },
];

/* ============================================================
   ANIMATED 404 NUMBER
   ============================================================ */
const Animated404: React.FC = () => (
  <div className="relative flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 mb-4 xs:mb-6">
    {/* Glow behind the numbers */}
    <motion.div
      className="absolute inset-0 rounded-full blur-3xl opacity-30"
      style={{ background: 'radial-gradient(circle, #1F6FEB80, transparent 70%)' }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />

    {['4', '0', '4'].map((digit, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          delay: 0.15 + i * 0.12,
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="relative text-[110px] xs:text-[140px] sm:text-[180px] md:text-[220px] lg:text-[260px] font-extrabold leading-none bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent select-none"
        style={{ textShadow: '0 0 80px rgba(31,111,235,0.3)' }}
      >
        {digit}
      </motion.span>
    ))}
  </div>
);

/* ============================================================
   FLOATING BLUE PARTICLES
   ============================================================ */
const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: 3 + (i % 4) * 2,
    left: `${(i * 7.3) % 100}%`,
    top: `${(i * 11.7) % 100}%`,
    duration: 6 + (i % 5) * 2,
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            boxShadow: '0 0 10px rgba(59,130,246,0.6)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   BROKEN PHONE SVG ILLUSTRATION
   ============================================================ */
const BrokenPhoneIllustration: React.FC = () => (
  <motion.svg
    viewBox="0 0 200 280"
    className="w-[130px] xs:w-[150px] sm:w-[170px] md:w-[190px] h-auto mb-4 xs:mb-6"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
    animate={{ opacity: 1, rotate: 0, scale: 1 }}
    transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
  >
    <defs>
      <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0f0f1a" />
      </linearGradient>
      <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1F6FEB" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>

    {/* Phone body */}
    <motion.rect
      x="40"
      y="20"
      width="120"
      height="240"
      rx="22"
      fill="url(#phoneBody)"
      stroke="#3a3a5e"
      strokeWidth="2"
      animate={{ rotate: [0, 1, 0, -1, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '100px 140px' }}
    />

    {/* Screen */}
    <rect x="50" y="30" width="100" height="220" rx="16" fill="url(#phoneScreen)" opacity="0.9" />

    {/* Crack lines */}
    <motion.path
      d="M100 90 L85 130 L115 160 L95 200 L105 240"
      stroke="#0f0f1a"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    <motion.path
      d="M60 120 L85 130 M115 160 L150 145"
      stroke="#0f0f1a"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 1.2 }}
    />

    {/* Sad face on screen */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <circle cx="78" cy="70" r="4" fill="#0f0f1a" />
      <circle cx="122" cy="70" r="4" fill="#0f0f1a" />
      <path
        d="M78 88 Q100 78 122 88"
        stroke="#0f0f1a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </motion.g>

    {/* Notch */}
    <circle cx="100" cy="42" r="4" fill="#0f0f1a" />

    {/* Floating sparkles */}
    <motion.circle
      cx="170"
      cy="80"
      r="3"
      fill="#3b82f6"
      animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
    <motion.circle
      cx="30"
      cy="140"
      r="2.5"
      fill="#60a5fa"
      animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
    />
    <motion.circle
      cx="180"
      cy="200"
      r="2"
      fill="#3b82f6"
      animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
    />
  </motion.svg>
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState('');

  // Read current path safely
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center py-12 xs:py-16 md:py-20 lg:py-24">
      {/* Ambient blue glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1F6FEB25, transparent 70%)' }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1428A025, transparent 70%)' }}
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Broken phone illustration */}
          <BrokenPhoneIllustration />

          {/* Big animated 404 */}
          <Animated404 />

          {/* Error badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/50 mb-3 xs:mb-4"
          >
            <ErrorOutlinedIcon sx={{ fontSize: 14 }} />
            Error 404 — Page Not Found
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2 xs:mb-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
          >
            This Page Took a Wrong Turn
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm xs:text-base text-white/70 max-w-lg mx-auto mb-2 xs:mb-3 leading-relaxed"
          >
            The page you&apos;re looking for doesn&apos;t exist, has been moved, or is temporarily
            unavailable. Let&apos;s get you back on track.
          </motion.p>

          {/* Show the bad path */}
          {path && path !== '/404' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-[10px] xs:text-xs text-white/40 font-mono mb-5 xs:mb-6 px-3 py-1 rounded-lg bg-gray-950 border border-blue-900/40 max-w-full truncate"
            >
              Requested path: <span className="text-blue-400">{path}</span>
            </motion.p>
          )}

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 w-full xs:w-auto mb-6 xs:mb-8"
          >
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-white text-blue-700 font-bold text-sm xs:text-base shadow-lg hover:shadow-2xl transition-all"
            >
              <ArrowBackIcon fontSize="small" />
              Go Back
            </motion.button>
            <Link to="/" className="w-full xs:w-auto">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm xs:text-base shadow-lg shadow-blue-900/50 transition-all"
              >
                <HomeIcon fontSize="small" />
                Back to Home
              </motion.span>
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="w-full max-w-2xl mb-6 xs:mb-8"
          >
            <p className="text-[10px] xs:text-xs text-white/50 uppercase font-bold tracking-wider mb-3">
              Or explore these pages
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3">
              {QUICK_LINKS.map((link, i) => (
                <Link key={link.href} to={link.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.08 }}
                    whileHover={{ y: -4, borderColor: '#2563eb' }}
                    className="bg-gray-950 border border-blue-900/40 rounded-2xl p-3 xs:p-4 flex flex-col items-center gap-1.5 xs:gap-2 transition-all cursor-pointer"
                  >
                    <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                      {link.icon}
                    </div>
                    <span className="text-[11px] xs:text-xs font-bold text-white">
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Support CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="w-full max-w-xl bg-gradient-to-br from-blue-600/10 to-blue-800/10 border border-blue-900/40 rounded-2xl p-4 xs:p-5"
          >
            <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-4">
              <div className="w-11 h-11 xs:w-12 xs:h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                <SearchIcon fontSize="small" />
              </div>
              <div className="flex-1 text-center xs:text-left">
                <p className="text-sm xs:text-base font-bold text-white mb-0.5">
                  Still can&apos;t find what you need?
                </p>
                <p className="text-[11px] xs:text-xs text-white/60">
                  Our team responds within minutes on WhatsApp.
                </p>
              </div>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 xs:px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs xs:text-sm shadow-lg shadow-blue-900/50 transition-all whitespace-nowrap"
              >
                <WhatsAppIcon fontSize="small" />
                Chat With Us
              </motion.a>
            </div>
          </motion.div>

          {/* Subtle footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-6 xs:mt-8 text-[10px] xs:text-xs text-white/40"
          >
            Samsung Store Rwanda · If this keeps happening,{' '}
            <Link to="/contact" className="text-blue-400 hover:underline">
              let us know
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

