// Footer.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpward as ArrowUpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Send as SendIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  LocalShipping as DeliveryIcon,
  Verified as VerifiedIcon,
  Payment as PaymentIcon,
  CreditCard as CardIcon,
  AccountBalanceWallet as WalletIcon,
  Security as SecurityIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from '@mui/icons-material';

/* ============================================================
   TYPES
   ============================================================ */
interface NewsletterForm {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* ============================================================
   CONSTANTS
   ============================================================ */
const WHATSAPP_NUMBER = '250787878787';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hello Samsung Store, I have a question.'
)}`;

/* ============================================================
   DATA
   ============================================================ */
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/market' },
      { label: 'Phones', href: '/market?category=phone' },
      { label: 'Tablets', href: '/market?category=tablet' },
      { label: 'Computers', href: '/market?category=computer' },
      { label: 'Accessories', href: '/market?category=accessories' },
      { label: 'Offers & Deals', href: '/market?offers=true' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Device Repair', href: '/services#repair' },
      { label: 'Trade-In Program', href: '/services#trade-in' },
      { label: 'Installment Plans', href: '/services#installment' },
      { label: 'Extended Warranty', href: '/services#warranty' },
      { label: 'Fast Delivery', href: '/services#delivery' },
      { label: 'Business Solutions', href: '/services#business' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/support' },
      { label: 'Order Tracking', href: '/orders/track' },
      { label: 'Returns & Refunds', href: '/returns' },
      { label: 'Warranty Info', href: '/warranty' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <FacebookIcon fontSize="small" />, href: 'https://facebook.com/samsungstore', label: 'Facebook' },
  { icon: <TwitterIcon fontSize="small" />, href: 'https://twitter.com/samsungstore', label: 'Twitter' },
  { icon: <InstagramIcon fontSize="small" />, href: 'https://instagram.com/samsungstore', label: 'Instagram' },
  { icon: <LinkedInIcon fontSize="small" />, href: 'https://linkedin.com/company/samsungstore', label: 'LinkedIn' },
  { icon: <YouTubeIcon fontSize="small" />, href: 'https://youtube.com/@samsungstore', label: 'YouTube' },
];

const PAYMENT_METHODS = [
  { icon: <WalletIcon fontSize="small" />, label: 'MTN MoMo' },
  { icon: <WalletIcon fontSize="small" />, label: 'Airtel Money' },
  { icon: <CardIcon fontSize="small" />, label: 'Visa / Mastercard' },
  { icon: <PaymentIcon fontSize="small" />, label: 'Cash on Delivery' },
];

/* ============================================================
   VALIDATION
   ============================================================ */
const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getNewsletterErrors = (form: NewsletterForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(form.email)) errors.email = 'Invalid email format';
  return errors;
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export const Footer: React.FC = () => {
  /* ---------- Newsletter ---------- */
  const [newsletterForm, setNewsletterForm] = useState<NewsletterForm>({ email: '' });
  const [newsletterTouched, setNewsletterTouched] = useState<Record<string, boolean>>({});
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'success' | 'error' | null>(null);

  const newsletterErrors = useMemo(() => getNewsletterErrors(newsletterForm), [newsletterForm]);
  const isNewsletterValid = Object.keys(newsletterErrors).length === 0;
  const newsletterShow = (field: string) => newsletterSubmitted || !!newsletterTouched[field];

  /* ---------- Back to top ---------- */
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /* ---------- Newsletter submit ---------- */
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setNewsletterTouched({ email: true });
    if (!isNewsletterValid) return;

    setNewsletterLoading(true);
    setNewsletterStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // Optional: replace with actual API
      // await axios.post('/api/newsletter', newsletterForm);
      setNewsletterStatus('success');
      setTimeout(() => {
        setNewsletterForm({ email: '' });
        setNewsletterTouched({});
        setNewsletterSubmitted(false);
        setNewsletterStatus(null);
      }, 3000);
    } catch {
      setNewsletterStatus('error');
    } finally {
      setNewsletterLoading(false);
    }
  };

  /* ---------- Year ---------- */
  const currentYear = new Date().getFullYear();

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <>
      <footer className="relative overflow-hidden bg-black border-t border-blue-900/40 pt-12 xs:pt-16 md:pt-20">
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 left-1/4 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, #1F6FEB15, transparent 70%)' }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 right-1/4 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, #1428A015, transparent 70%)' }}
            animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
          {/* ============================================================
              TOP — Newsletter CTA
              ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 xs:p-8 md:p-10 mb-10 xs:mb-12 md:mb-16"
          >
            <motion.div
              className="absolute top-0 right-0 w-48 xs:w-64 h-48 xs:h-64 rounded-full bg-white/10 blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-48 xs:w-64 h-48 xs:h-64 rounded-full bg-black/20 blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 xs:gap-6 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider mb-3">
                  <SendIcon sx={{ fontSize: 14 }} />
                  Newsletter
                </div>
                <h3 className="text-xl xs:text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Get Exclusive Deals in Your Inbox
                </h3>
                <p className="text-xs xs:text-sm md:text-base text-white/90 max-w-md mx-auto lg:mx-0">
                  Subscribe to receive the latest Samsung launches, price drops, and exclusive
                  offers. No spam — ever.
                </p>
              </div>

              <div>
                {newsletterStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl p-4 xs:p-5 flex items-center gap-3 text-white"
                  >
                    <CheckCircleIcon sx={{ fontSize: 32 }} />
                    <div>
                      <p className="font-extrabold text-sm xs:text-base">You&apos;re subscribed!</p>
                      <p className="text-xs xs:text-sm text-white/80">
                        Check your inbox for a welcome email.
                      </p>
                    </div>
                  </motion.div>
                ) : newsletterStatus === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/20 backdrop-blur border border-red-300/50 rounded-2xl p-4 xs:p-5 flex items-center gap-3 text-white"
                  >
                    <ErrorIcon sx={{ fontSize: 32 }} />
                    <div>
                      <p className="font-extrabold text-sm xs:text-base">Something went wrong</p>
                      <p className="text-xs xs:text-sm text-white/80">Please try again.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletter} noValidate className="w-full">
                    <div className="flex flex-col xs:flex-row gap-2">
                      <div className="relative flex-1">
                        <EmailIcon
                          sx={{ fontSize: 20 }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none"
                        />
                        <input
                          type="email"
                          value={newsletterForm.email}
                          onChange={(e) => setNewsletterForm({ email: e.target.value })}
                          onBlur={() => setNewsletterTouched((t) => ({ ...t, email: true }))}
                          placeholder="Enter your email"
                          className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 backdrop-blur border-2 text-white placeholder-white/60 outline-none transition-all ${
                            newsletterShow('email') && newsletterErrors.email
                              ? 'border-red-300 focus:border-red-300'
                              : newsletterShow('email') && !newsletterErrors.email && newsletterForm.email.trim()
                              ? 'border-green-300 focus:border-green-300'
                              : 'border-white/30 focus:border-white'
                          }`}
                        />
                        {newsletterShow('email') && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {newsletterErrors.email ? (
                              <ErrorIcon sx={{ fontSize: 18, color: '#fca5a5' }} />
                            ) : newsletterForm.email.trim() ? (
                              <CheckCircleIcon sx={{ fontSize: 18, color: '#86efac' }} />
                            ) : null}
                          </div>
                        )}
                      </div>
                      <motion.button
                        type="submit"
                        disabled={!isNewsletterValid || newsletterLoading}
                        whileHover={isNewsletterValid && !newsletterLoading ? { scale: 1.03 } : {}}
                        whileTap={isNewsletterValid && !newsletterLoading ? { scale: 0.97 } : {}}
                        className={`px-5 xs:px-6 py-3 rounded-xl font-bold text-sm xs:text-base flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                          isNewsletterValid
                            ? 'bg-white text-blue-700 hover:bg-gray-100 shadow-lg cursor-pointer'
                            : 'bg-red-500/80 text-white cursor-not-allowed shadow-md'
                        } ${newsletterLoading ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        {newsletterLoading ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                        ) : (
                          <>
                            <SendIcon fontSize="small" />
                            Subscribe
                          </>
                        )}
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {newsletterShow('email') && newsletterErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -5, height: 0 }}
                          className="text-red-200 text-xs mt-2 flex items-center gap-1 font-medium"
                        >
                          <ErrorIcon sx={{ fontSize: 14 }} />
                          {newsletterErrors.email}
                        </motion.p>
                      )}
                      {newsletterShow('email') && !newsletterErrors.email && newsletterForm.email.trim() && (
                        <motion.p
                          initial={{ opacity: 0, y: -5, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -5, height: 0 }}
                          className="text-green-200 text-xs mt-2 flex items-center gap-1 font-medium"
                        >
                          <CheckCircleIcon sx={{ fontSize: 14 }} />
                          Looks good!
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="text-[10px] xs:text-xs text-white/70 mt-2">
                      By subscribing you agree to our Privacy Policy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* ============================================================
              MIDDLE — Link columns
              ============================================================ */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 xs:gap-8 mb-10 xs:mb-12 md:mb-16">
            {/* Brand column (2 cols on lg) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-3 lg:col-span-2"
            >
              {/* Logo */}
              <a href="/" className="inline-flex items-center gap-2 mb-3 xs:mb-4">
                <svg
                  viewBox="0 0 200 40"
                  className="h-8 xs:h-9 w-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="200" y2="40">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1F6FEB" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="100" cy="20" rx="95" ry="16" fill="url(#footerLogoGrad)" opacity="0.15" />
                  <text
                    x="100"
                    y="27"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    letterSpacing="1"
                    fill="url(#footerLogoGrad)"
                    fontFamily="Arial, Helvetica, sans-serif"
                  >
                    SAMSUNG
                  </text>
                </svg>
              </a>

              <p className="text-white/70 text-xs xs:text-sm leading-relaxed mb-4 max-w-sm">
                Rwanda&apos;s most trusted Samsung store since 2016. Genuine products, official
                warranty, fast delivery, and 24/7 support. Your next device is one tap away.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { icon: <VerifiedIcon sx={{ fontSize: 14 }} />, label: 'Official' },
                  { icon: <DeliveryIcon sx={{ fontSize: 14 }} />, label: 'Fast Delivery' },
                  { icon: <SecurityIcon sx={{ fontSize: 14 }} />, label: 'Secure' },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-950/60 border border-blue-900/50 text-white text-[10px] xs:text-xs font-semibold"
                  >
                    <span className="text-blue-400">{badge.icon}</span>
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-white text-xs xs:text-sm font-bold mb-2">Follow Us</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-blue-950/60 border border-blue-900/50 hover:border-blue-600 flex items-center justify-center text-white hover:text-blue-400 hover:bg-blue-600/20 transition-all"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Link columns */}
            {FOOTER_COLUMNS.map((column, colIdx) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIdx * 0.08 }}
                className="col-span-1"
              >
                <h4 className="text-white text-sm xs:text-base font-extrabold mb-3 xs:mb-4 relative inline-block">
                  {column.title}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + colIdx * 0.08 }}
                  />
                </h4>
                <ul className="space-y-1.5 xs:space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-white/70 hover:text-blue-400 text-xs xs:text-sm transition-colors"
                      >
                        <ArrowRightIcon
                          sx={{ fontSize: 12 }}
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ============================================================
              CONTACT STRIP
              ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 mb-10 xs:mb-12 md:mb-16"
          >
            {[
              {
                icon: <LocationIcon />,
                title: 'Visit Us',
                line1: 'KN 4 Ave, Kigali City Center',
                line2: 'Kigali, Rwanda',
                href: 'https://maps.google.com/?q=Kigali+City+Center',
              },
              {
                icon: <PhoneIcon />,
                title: 'Call Us',
                line1: '+250 787 878 787',
                line2: 'Mon–Sat, 8AM–8PM',
                href: 'tel:+250787878787',
              },
              {
                icon: <EmailIcon />,
                title: 'Email Us',
                line1: 'hello@samsungstore.rw',
                line2: 'We reply within 1 hour',
                href: 'mailto:hello@samsungstore.rw',
              },
              {
                icon: <WhatsAppIcon />,
                title: 'WhatsApp',
                line1: '+250 787 878 787',
                line2: '24/7 support',
                href: WHATSAPP_LINK,
              },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(31,111,235,0.2)' }}
                className="bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-3 xs:p-4 flex items-start gap-3 transition-all"
              >
                <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs xs:text-sm font-extrabold text-white mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-[11px] xs:text-xs text-white/80 truncate">{item.line1}</p>
                  <p className="text-[10px] xs:text-xs text-white/50 truncate">{item.line2}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ============================================================
              PAYMENTS ROW
              ============================================================ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-blue-900/40 py-4 xs:py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] xs:text-xs text-white/50 uppercase font-bold tracking-wide mr-1">
                We Accept
              </span>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method.label}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-950 border border-blue-900/40 text-white text-[10px] xs:text-xs font-semibold"
                >
                  <span className="text-blue-400">{method.icon}</span>
                  {method.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/50 text-[10px] xs:text-xs">
              <SecurityIcon sx={{ fontSize: 14 }} />
              Secure checkout · SSL encrypted
            </div>
          </motion.div>

          {/* ============================================================
              BOTTOM BAR
              ============================================================ */}
          <div className="border-t border-blue-900/40 py-4 xs:py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/60 text-[11px] xs:text-xs text-center md:text-left">
              © {currentYear}{' '}
              <span className="text-white font-bold">Samsung Store Rwanda</span>. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 xs:gap-x-4 gap-y-1.5">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookies', href: '/cookies' },
                { label: 'Sitemap', href: '/sitemap' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-blue-400 text-[11px] xs:text-xs transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-white/40 text-[10px] xs:text-xs text-center md:text-right">
              Made with <span className="text-red-400">♥</span> in Kigali, Rwanda
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================
          BACK TO TOP BUTTON (fixed)
          ============================================================ */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-4 xs:bottom-6 right-4 xs:right-6 z-50 w-11 h-11 xs:w-12 xs:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-900/50 flex items-center justify-center transition-colors"
          >
            <ArrowUpIcon />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

