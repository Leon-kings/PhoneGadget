// About.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Verified as VerifiedIcon,
  Storefront as StorefrontIcon,
  Groups as GroupsIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  SupportAgent as SupportAgentIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  WorkspacePremium as PremiumIcon,
  PhoneAndroid as PhoneIcon,
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayArrowIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  VerifiedUser as VerifiedUserIcon,
} from '@mui/icons-material';

/* ============================================================
   TYPES
   ============================================================ */
interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  suffix?: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image: string;
}

/* ============================================================
   DATA
   ============================================================ */
const STATS: Stat[] = [
  { icon: <StorefrontIcon />, value: '12', label: 'Stores Nationwide', suffix: '+' },
  { icon: <GroupsIcon />, value: '50', label: 'Happy Customers', suffix: 'K+' },
  { icon: <PhoneIcon />, value: '100', label: 'Products in Stock', suffix: '+' },
  { icon: <TrophyIcon />, value: '8', label: 'Years of Excellence', suffix: '' },
];

const VALUES: Value[] = [
  {
    icon: <VerifiedIcon />,
    title: '100% Authentic',
    description:
      'Every device we sell is sourced directly from Samsung. No fakes, no compromises — only genuine products with official warranty.',
  },
  {
    icon: <LocalShippingIcon />,
    title: 'Fast Delivery',
    description:
      'Same-day delivery in Kigali and 24-48 hour delivery nationwide. Free shipping on orders above 50,000 RWF.',
  },
  {
    icon: <SecurityIcon />,
    title: 'Official Warranty',
    description:
      'Every purchase comes with a 1-year official Samsung warranty and our 30-day money-back guarantee.',
  },
  {
    icon: <SupportAgentIcon />,
    title: '24/7 Support',
    description:
      'Our team is available around the clock on WhatsApp, phone, and email to answer your questions and solve problems.',
  },
  {
    icon: <PremiumIcon />,
    title: 'Best Prices',
    description:
      'We offer the most competitive prices in Rwanda with flexible installment plans and trade-in options.',
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Latest Tech',
    description:
      "We stock the newest Samsung releases the moment they launch. Be the first to experience tomorrow's technology today.",
  },
];

const MILESTONES: Milestone[] = [
  { year: '2016', title: 'Founded in Kigali', description: 'Started as a small kiosk with a big dream.' },
  { year: '2018', title: 'First Official Store', description: 'Opened our flagship store in Kigali City Center.' },
  { year: '2020', title: 'Went Online', description: 'Launched e-commerce and same-day delivery.' },
  { year: '2022', title: 'Nationwide Expansion', description: 'Opened 12 stores across all provinces.' },
  { year: '2024', title: 'Samsung Premium Partner', description: 'Recognized as an official Samsung premium retailer.' },
];

const TEAM: TeamMember[] = [
  {
    name: 'Eric Nkurunziza',
    role: 'Founder & CEO',
    initials: 'EN',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Aline Uwase',
    role: 'Head of Sales',
    initials: 'AU',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
  },
  {
    name: 'Patrick Habimana',
    role: 'Tech Lead',
    initials: 'PH',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'Grace Mutoni',
    role: 'Customer Success',
    initials: 'GM',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
];

const TESTIMONIALS = [
  {
    name: 'Jean Bosco',
    role: 'Galaxy S24 Ultra owner',
    quote:
      'Best phone store in Kigali! Fast delivery, genuine products, and the staff really knows their stuff.',
    rating: 5,
    initials: 'JB',
  },
  {
    name: 'Diane Mukamana',
    role: 'Galaxy Watch 6 owner',
    quote:
      'I bought my Galaxy Watch 6 here and got a great price. The warranty service was excellent too.',
    rating: 5,
    initials: 'DM',
  },
  {
    name: 'Samuel Rwigema',
    role: 'Galaxy Z Fold 5 owner',
    quote:
      'They walked me through every feature of the Fold 5 before I bought it. Genuinely helpful team.',
    rating: 5,
    initials: 'SR',
  },
];

/* ============================================================
   COUNTER COMPONENT (animates when in view)
   ============================================================ */
const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* ============================================================
   SECTION HEADER
   ============================================================ */
const SectionHeader: React.FC<{ eyebrow: string; title: string; description?: string }> = ({
  eyebrow,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    className="text-center mb-8 xs:mb-10 lg:mb-14 max-w-2xl mx-auto px-3 xs:px-4"
  >
    <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/50 mb-3 xs:mb-4">
      {eyebrow}
    </div>
    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 xs:mb-3 leading-tight">
      {title}
    </h2>
    {description && (
      <p className="text-sm xs:text-base text-white/70 leading-relaxed">{description}</p>
    )}
  </motion.div>
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export const About: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-12 xs:py-16 md:py-20 lg:py-24">
      {/* Ambient blue glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1F6FEB20, transparent 70%)' }}
          animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1428A020, transparent 70%)' }}
          animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        {/* ============================================================
            SECTION 1 — OUR STORY (2-column intro)
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-14 items-center mb-14 xs:mb-16 lg:mb-24">
          {/* LEFT: Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] xs:aspect-[4/5] sm:aspect-square lg:aspect-[4/5] border border-blue-900/40">
              {/* Main image — Samsung store interior */}
              <motion.img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop"
                alt="Samsung store"
                className="w-full h-full object-cover"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Floating badge 1 — top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="absolute -top-3 xs:-top-4 -left-2 xs:-left-4 bg-white rounded-2xl shadow-2xl p-2.5 xs:p-3.5 flex items-center gap-2"
            >
              <div className="w-9 h-9 xs:w-11 xs:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <VerifiedIcon fontSize="small" />
              </div>
              <div>
                <p className="text-[10px] xs:text-xs text-gray-500 font-medium">Official</p>
                <p className="text-xs xs:text-sm font-extrabold text-black">Samsung Store</p>
              </div>
            </motion.div>

            {/* Floating badge 2 — bottom-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -4 }}
              className="absolute -bottom-3 xs:-bottom-4 -right-2 xs:-right-4 bg-white rounded-2xl shadow-2xl p-2.5 xs:p-3.5"
            >
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 14, color: '#fbbf24' }} />
                ))}
              </div>
              <p className="text-[10px] xs:text-xs text-gray-500 font-medium">Rated by</p>
              <p className="text-xs xs:text-sm font-extrabold text-black">50K+ customers</p>
            </motion.div>

            {/* Play video button */}
            <motion.button
              onClick={() => setVideoOpen(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-blue-600 shadow-2xl"
              aria-label="Watch our story"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <PlayArrowIcon sx={{ fontSize: 36, position: 'relative', zIndex: 1 }} />
            </motion.button>
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/50 mb-3 xs:mb-4">
              <StarIcon sx={{ fontSize: 14 }} />
              Our Story
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 xs:mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Rwanda&apos;s Most Trusted Samsung Store
            </h2>

            <p className="text-sm xs:text-base text-white/80 leading-relaxed mb-3 xs:mb-4">
              Since 2016, we&apos;ve been on a mission to bring the latest Samsung technology to
              every corner of Rwanda. What started as a small kiosk in Kigali has grown into the
              country&apos;s largest official Samsung retailer — with 12 stores, 50,000+ happy
              customers, and a promise that never changes.
            </p>

            <p className="text-sm xs:text-base text-white/70 leading-relaxed mb-4 xs:mb-6">
              We don&apos;t just sell phones. We deliver experiences — from hands-on demos and
              expert advice to lifetime support and honest pricing. Every purchase is backed by
              official warranty, fast delivery, and a team that genuinely cares.
            </p>

            {/* Highlight list */}
            <ul className="space-y-2 xs:space-y-2.5 mb-5 xs:mb-6 text-left">
              {[
                'Only genuine Samsung products — guaranteed',
                'Same-day delivery in Kigali',
                'Flexible installment plans available',
                'Free setup & data transfer on every purchase',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-2 text-white text-sm xs:text-base"
                >
                  <CheckCircleIcon
                    sx={{ fontSize: 20, color: '#3b82f6', flexShrink: 0, marginTop: '2px' }}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
              <motion.a
                href="https://wa.me/250787878787?text=Hello%20Samsung%20Store%2C%20I%20want%20to%20know%20more%20about%20your%20store."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(31,111,235,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm xs:text-base shadow-lg shadow-blue-900/50 transition-all"
              >
                <WhatsAppIcon fontSize="small" />
                Chat With Us
              </motion.a>
              <motion.a
                href="/market"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-bold text-sm xs:text-base transition-all"
              >
                Browse Store
                <ArrowForwardIcon fontSize="small" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            SECTION 2 — STATS
            ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5 mb-14 xs:mb-16 lg:mb-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(31,111,235,0.25)' }}
              className="relative bg-gray-950 border border-blue-900/40 rounded-2xl p-4 xs:p-5 md:p-6 text-center overflow-hidden group transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <div className="relative z-10">
                <div className="w-11 h-11 xs:w-12 xs:h-12 md:w-14 md:h-14 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 mx-auto mb-2.5 xs:mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1">
                  <Counter target={parseInt(stat.value)} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] xs:text-xs md:text-sm text-white/60 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================
            SECTION 3 — OUR VALUES (cards grid)
            ============================================================ */}
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Our Promise to You"
          description="Six principles we stand behind — every product, every customer, every day."
        />

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 md:gap-5 lg:gap-6 mb-14 xs:mb-16 lg:mb-24">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 150 }}
              whileHover={{ y: -6 }}
              className="group relative bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-4 xs:p-5 md:p-6 transition-all overflow-hidden"
            >
              {/* Glow on hover */}
              <motion.div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white mb-3 xs:mb-4 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-base xs:text-lg font-extrabold text-white mb-1.5 xs:mb-2">
                  {value.title}
                </h3>
                <p className="text-xs xs:text-sm text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================
            SECTION 4 — TIMELINE
            ============================================================ */}
        <SectionHeader
          eyebrow="Our Journey"
          title="From Kiosk to Country"
          description="Eight years of growth, one satisfied customer at a time."
        />

        <div className="relative mb-14 xs:mb-16 lg:mb-24">
          {/* Vertical line (mobile) / horizontal (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          <div className="lg:hidden absolute left-4 xs:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-600 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 xs:gap-6 lg:gap-4 pl-12 xs:pl-14 lg:pl-0">
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {/* Dot */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="absolute -left-12 xs:-left-14 lg:left-1/2 lg:-translate-x-1/2 top-0 lg:top-6 w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-blue-600 border-4 border-black flex items-center justify-center shadow-lg shadow-blue-900/50 z-10"
                >
                  <span className="text-white text-[10px] xs:text-xs font-bold">{i + 1}</span>
                </motion.div>

                <div className="lg:pt-20 bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-3 xs:p-4 transition-colors">
                  <p className="text-blue-500 font-extrabold text-lg xs:text-xl mb-1">
                    {milestone.year}
                  </p>
                  <h4 className="text-sm xs:text-base font-bold text-white mb-1">
                    {milestone.title}
                  </h4>
                  <p className="text-[11px] xs:text-xs text-white/60 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ============================================================
            SECTION 5 — TEAM
            ============================================================ */}
        <SectionHeader
          eyebrow="Meet The Team"
          title="The People Behind the Phones"
          description="A small team with a huge passion for technology and customer service."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 md:gap-5 mb-14 xs:mb-16 lg:mb-24">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
              whileHover={{ y: -6 }}
              className="group relative bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl overflow-hidden transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-blue-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    el.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white text-4xl font-extrabold">
                        ${member.initials}
                      </div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-3 xs:p-4 text-center">
                <h4 className="text-sm xs:text-base font-extrabold text-white truncate">
                  {member.name}
                </h4>
                <p className="text-[11px] xs:text-xs text-blue-400 font-medium mt-0.5">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================
            SECTION 6 — TESTIMONIALS
            ============================================================ */}
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Customers Say"
          description="Real reviews from real Samsung owners across Rwanda."
        />

        <div className="max-w-3xl mx-auto mb-14 xs:mb-16 lg:mb-24">
          <div className="relative bg-gradient-to-br from-gray-950 to-black border border-blue-900/40 rounded-3xl p-5 xs:p-7 md:p-10 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-3 xs:mb-4">
                  {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: { xs: 20, sm: 24 }, color: '#fbbf24' }} />
                  ))}
                </div>
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white font-medium italic leading-relaxed mb-5 xs:mb-6">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-11 h-11 xs:w-12 xs:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm xs:text-base shadow-lg shadow-blue-900/50">
                    {TESTIMONIALS[activeTestimonial].initials}
                  </div>
                  <div className="text-left">
                    <p className="text-sm xs:text-base font-bold text-white">
                      {TESTIMONIALS[activeTestimonial].name}
                    </p>
                    <p className="text-[11px] xs:text-xs text-white/60">
                      {TESTIMONIALS[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-5 xs:mt-6 relative z-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeTestimonial
                      ? 'w-6 xs:w-8 h-2 xs:h-2.5 bg-blue-500'
                      : 'w-2 xs:w-2.5 h-2 xs:h-2.5 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            SECTION 7 — LOCATION INFO
            ============================================================ */}
        <SectionHeader
          eyebrow="Visit Us"
          title="Come Say Hello"
          description="Drop by our flagship store in Kigali or reach out online — we'd love to meet you."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4 md:gap-5 mb-14 xs:mb-16 lg:mb-24">
          {[
            {
              icon: <LocationIcon />,
              title: 'Flagship Store',
              line1: 'KN 4 Ave, Kigali City Center',
              line2: 'Kigali, Rwanda',
            },
            {
              icon: <ClockIcon />,
              title: 'Opening Hours',
              line1: 'Mon–Sat: 8:00 AM – 8:00 PM',
              line2: 'Sun: 10:00 AM – 6:00 PM',
            },
            {
              icon: <WhatsAppIcon />,
              title: 'Contact Us',
              line1: '+250 787 878 787',
              line2: 'Available 24/7 on WhatsApp',
            },
          ].map((item, i) => (
            <motion.a
              key={item.title}
              href={
                item.title === 'Contact Us'
                  ? 'https://wa.me/250787878787'
                  : item.title === 'Flagship Store'
                  ? 'https://maps.google.com/?q=Kigali+City+Center'
                  : '#'
              }
              target={item.title !== 'Opening Hours' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(31,111,235,0.2)' }}
              className="bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-4 xs:p-5 md:p-6 flex items-start gap-3 xs:gap-4 transition-all"
            >
              <div className="w-11 h-11 xs:w-12 xs:h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm xs:text-base font-extrabold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs xs:text-sm text-white/80 truncate">{item.line1}</p>
                <p className="text-xs xs:text-sm text-white/60 truncate">{item.line2}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ============================================================
            SECTION 8 — FINAL CTA
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 xs:p-8 md:p-12 text-center"
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/20 blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider mb-3 xs:mb-4">
              <VerifiedUserIcon sx={{ fontSize: 14 }} />
              Ready When You Are
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 xs:mb-3 leading-tight">
              Experience Samsung Today
            </h2>
            <p className="text-sm xs:text-base text-white/90 mb-5 xs:mb-6 max-w-xl mx-auto">
              Come visit our store, chat with us on WhatsApp, or browse online — your next favorite
              device is one tap away.
            </p>
            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3">
              <motion.a
                href="https://wa.me/250787878787?text=Hi%2C%20I%20want%20to%20visit%20your%20store."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-white text-blue-700 font-bold text-sm xs:text-base shadow-lg hover:shadow-2xl transition-all"
              >
                <WhatsAppIcon fontSize="small" />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                href="/market"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-blue-950/40 backdrop-blur border-2 border-white/30 text-white font-bold text-sm xs:text-base hover:bg-blue-950/60 transition-all"
              >
                Browse Products
                <ArrowForwardIcon fontSize="small" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================
          VIDEO MODAL
          ============================================================ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4 bg-black/90 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.button
              onClick={() => setVideoOpen(false)}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center z-10"
              aria-label="Close video"
            >
              ✕
            </motion.button>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                  <PlayArrowIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
                </div>
                <h3 className="text-white font-extrabold text-xl mb-2">
                  Samsung Store — Our Story
                </h3>
                <p className="text-white/60 text-sm max-w-md">
                  Video coming soon. In the meantime, chat with us on WhatsApp to learn more about
                  what we do.
                </p>
                <motion.a
                  href="https://wa.me/250787878787"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold text-sm"
                >
                  <WhatsAppIcon fontSize="small" />
                  Chat With Us
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

