// Services.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Close as CloseIcon,
  PhoneAndroid as PhoneIcon,
  Build as RepairIcon,
  SwapHoriz as TradeInIcon,
  CreditCard as InstallmentIcon,
  Shield as WarrantyIcon,
  LocalShipping as DeliveryIcon,
  Settings as SetupIcon,
  School as TrainingIcon,
  Business as BusinessIcon,
  Recycling as RecyclingIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  WhatsApp as WhatsAppIcon,
  Star as StarIcon,
  AccessTime as ClockIcon,
  Verified as VerifiedIcon,
  Info as InfoIcon,
  Phone as PhoneCallIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

/* ============================================================
   TYPES
   ============================================================ */
interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  duration: string;
  features: string[];
  badge?: string;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

/* ============================================================
   WHATSAPP CONFIG
   ============================================================ */
const WHATSAPP_NUMBER = '250787878787';

const getWhatsAppLink = (serviceName?: string) => {
  const msg = serviceName
    ? `Hello Samsung Store, I'm interested in the "${serviceName}" service. Please share more details.`
    : 'Hello Samsung Store, I want to know more about your services.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

/* ============================================================
   SERVICES DATA
   ============================================================ */
const SERVICES: Service[] = [
  {
    id: 'repair',
    icon: <RepairIcon />,
    title: 'Device Repair',
    shortDescription: 'Screen, battery, and hardware repairs by certified Samsung technicians.',
    fullDescription:
      'Our certified technicians repair all Samsung devices — from cracked screens to battery replacements, water damage, and charging port issues. We use genuine Samsung parts and back every repair with a 90-day warranty.',
    price: 'From 25,000 RWF',
    duration: '1–3 days',
    badge: 'Most Popular',
    features: [
      'Genuine Samsung parts only',
      '90-day repair warranty',
      'Free diagnostic check',
      'Same-day repairs available',
      'All models supported',
      'In-store and pickup options',
    ],
  },
  {
    id: 'trade-in',
    icon: <TradeInIcon />,
    title: 'Trade-In Program',
    shortDescription: 'Trade your old phone for instant credit toward a new Samsung.',
    fullDescription:
      'Bring your old device — any brand, any condition — and get instant credit toward a brand new Samsung. We handle data wipe, certification, and safe disposal. Best trade-in values in Rwanda, guaranteed.',
    price: 'Up to 800,000 RWF credit',
    duration: 'Same day',
    badge: 'Best Value',
    features: [
      'Accept any brand',
      'Instant valuation',
      'Data wiped securely',
      'Credit applied on the spot',
      'Best trade-in rates in Rwanda',
      'Eco-friendly recycling',
    ],
  },
  {
    id: 'installment',
    icon: <InstallmentIcon />,
    title: 'Installment Plans',
    shortDescription: 'Buy now, pay later — flexible plans from 3 to 24 months.',
    fullDescription:
      'Get any Samsung device today and pay over 3–24 months with 0% interest on selected models. Quick approval, minimal paperwork, and flexible payment schedules that fit your budget.',
    price: '0% interest available',
    duration: '3–24 months',
    features: [
      '0% interest on selected models',
      '3 to 24 month plans',
      'Quick approval in 24h',
      'Minimal paperwork',
      'Works with major banks',
      'Early payoff at no penalty',
    ],
  },
  {
    id: 'warranty',
    icon: <WarrantyIcon />,
    title: 'Extended Warranty',
    shortDescription: 'Protect your device beyond the standard 1-year warranty.',
    fullDescription:
      'Extend your Samsung warranty by 1 or 2 additional years and cover accidental damage, liquid damage, and mechanical failures. One flat rate, no hidden fees, full peace of mind.',
    price: 'From 40,000 RWF/year',
    duration: '1–2 years',
    features: [
      'Accidental damage coverage',
      'Liquid damage protection',
      'Mechanical failures covered',
      'Free replacement unit',
      'No hidden fees',
      'One flat rate',
    ],
  },
  {
    id: 'delivery',
    icon: <DeliveryIcon />,
    title: 'Fast Delivery',
    shortDescription: 'Same-day delivery in Kigali, 24–48h nationwide.',
    fullDescription:
      'Order online and we deliver to your door — same-day in Kigali, 24–48 hours anywhere in Rwanda. Free delivery on orders above 50,000 RWF, and every device arrives sealed, insured, and ready to use.',
    price: 'Free above 50,000 RWF',
    duration: 'Same day / 24–48h',
    features: [
      'Same-day in Kigali',
      '24–48h nationwide',
      'Free above 50,000 RWF',
      'Insured shipping',
      'Real-time tracking',
      'Cash on delivery available',
    ],
  },
  {
    id: 'setup',
    icon: <SetupIcon />,
    title: 'Free Setup & Transfer',
    shortDescription: 'We set up your new phone and transfer all your data — free.',
    fullDescription:
      'Buy any device from us and we will set it up for you — Google account, apps, settings, and a full data transfer from your old phone. Walk out ready to use it, no tech skills needed.',
    price: 'Free with purchase',
    duration: '15–30 min',
    features: [
      'Full data transfer',
      'Google account setup',
      'Essential apps installed',
      'Privacy settings configured',
      'SIM card installation',
      'Free with any purchase',
    ],
  },
  {
    id: 'training',
    icon: <TrainingIcon />,
    title: 'Device Training',
    shortDescription: 'One-on-one training to master your new Samsung device.',
    fullDescription:
      'New to Samsung or upgrading from another brand? Our experts walk you through every feature — camera tricks, Galaxy AI, Bixby, Samsung Pay, and more. Free for buyers, small fee for others.',
    price: 'Free with purchase',
    duration: '45 min session',
    features: [
      'One-on-one sessions',
      'Camera & photo tips',
      'Galaxy AI walkthrough',
      'Samsung Pay setup',
      'Bixby & SmartThings',
      'In-store or online',
    ],
  },
  {
    id: 'business',
    icon: <BusinessIcon />,
    title: 'Business Solutions',
    shortDescription: 'Bulk orders, corporate accounts, and enterprise deployment.',
    fullDescription:
      'Fleet-wide Samsung devices for your team — bulk pricing, dedicated account manager, on-site setup, and 24/7 business support. Knox enrollment included for full enterprise security.',
    price: 'Custom quote',
    duration: 'Flexible',
    badge: 'Enterprise',
    features: [
      'Bulk pricing discounts',
      'Dedicated account manager',
      'On-site setup & training',
      'Knox enterprise enrollment',
      '24/7 business support',
      'Flexible invoicing',
    ],
  },
  {
    id: 'recycling',
    icon: <RecyclingIcon />,
    title: 'Eco Recycling',
    shortDescription: 'Safe, certified recycling of old devices — plus instant credit.',
    fullDescription:
      'Drop off any old device and we will recycle it safely through certified Samsung channels. Get instant credit toward your next purchase, and we make sure toxic materials never touch a landfill.',
    price: 'Free + up to 200,000 RWF credit',
    duration: 'Same day',
    features: [
      'Certified Samsung recycling',
      'Instant credit toward purchase',
      'Data wiped securely',
      'No landfill disposal',
      'Any brand accepted',
      'Environmental certificate',
    ],
  },
];

/* ============================================================
   VALIDATION
   ============================================================ */
const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string): boolean => /^\+?[\d\s-]{10,15}$/.test(phone);

const getBookingErrors = (form: BookingForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  else if (form.name.trim().length < 3) errors.name = 'Name must be at least 3 characters';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(form.email)) errors.email = 'Invalid email format';
  if (!form.phone.trim()) errors.phone = 'Phone is required';
  else if (!validatePhone(form.phone)) errors.phone = 'Invalid phone number (10-15 digits)';
  if (!form.service.trim()) errors.service = 'Please select a service';
  if (!form.message.trim()) errors.message = 'Message is required';
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
};

/* ============================================================
   FIELD COMPONENT (white modal, black text)
   ============================================================ */
interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  type?: string;
  icon?: React.ReactNode;
  index?: number;
  textarea?: boolean;
  rows?: number;
  select?: boolean;
  options?: { value: string; label: string }[];
}

const Field: React.FC<FieldProps> = ({
  label, value, onChange, onBlur, error, touched,
  type = 'text', icon, index = 0, textarea = false, rows = 4,
  select = false, options = [],
}) => {
  const showError = !!touched && !!error;
  const showValid = !!touched && !error && value.trim() !== '';
  const borderClass = showError
    ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
    : showValid
    ? 'border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20'
    : 'border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300 }}
      className="w-full mb-4"
    >
      <label className="block text-sm font-semibold text-black mb-1.5">{label}</label>
      <div className="relative">
        {icon && !textarea && !select && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors ${
              showError ? 'text-red-500' : 'text-blue-600'
            }`}
          >
            {icon}
          </div>
        )}
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            rows={rows}
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-black outline-none transition-all duration-300 resize-none placeholder-gray-400 ${borderClass}`}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        ) : select ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-black outline-none transition-all duration-300 appearance-none ${borderClass}`}
          >
            <option value="">Select a service...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-10 py-3 rounded-xl border-2 bg-white text-black outline-none transition-all duration-300 placeholder-gray-400 ${borderClass}`}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )}
        {!textarea && !select && touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {showValid ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircleIcon fontSize="small" sx={{ color: '#2563eb' }} />
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <ErrorIcon fontSize="small" sx={{ color: '#ef4444' }} />
              </motion.div>
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium"
          >
            <ErrorIcon sx={{ fontSize: 14 }} />
            {error}
          </motion.p>
        )}
        {showValid && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-blue-600 text-xs mt-1 flex items-center gap-1 font-medium"
          >
            <CheckCircleIcon sx={{ fontSize: 14 }} />
            Looks good!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'success' | 'error' | null>(null);

  /* ---------- Booking form ---------- */
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [bookingTouched, setBookingTouched] = useState<Record<string, boolean>>({});
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const bookingErrors = React.useMemo(() => getBookingErrors(bookingForm), [bookingForm]);
  const isBookingValid = Object.keys(bookingErrors).length === 0;
  const bookingShow = (f: string) => bookingSubmitted || !!bookingTouched[f];

  /* ---------- Handlers ---------- */
  const openDetails = (service: Service) => {
    setSelectedService(service);
    setDetailsOpen(true);
  };

  const openBooking = (service?: Service) => {
    if (service) {
      setBookingForm((prev) => ({ ...prev, service: service.title }));
    }
    setBookingStatus(null);
    setBookingOpen(true);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setBookingTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (!isBookingValid) return;
    setLoading(true);
    setBookingStatus(null);

    try {
      // Simulated API call — replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setBookingStatus('success');
      setTimeout(() => {
        setBookingOpen(false);
        setBookingForm({ name: '', email: '', phone: '', service: '', message: '' });
        setBookingTouched({});
        setBookingSubmitted(false);
        setBookingStatus(null);
      }, 1500);
    } catch {
      setBookingStatus('error');
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <section className="relative overflow-hidden bg-black py-12 xs:py-16 md:py-20 lg:py-24">
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1F6FEB20, transparent 70%)' }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1428A020, transparent 70%)' }}
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        {/* ============================================================
            HEADER
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-8 xs:mb-10 lg:mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/50 mb-3 xs:mb-4">
            <StarIcon sx={{ fontSize: 14 }} />
            Our Services
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2 xs:mb-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            More Than Just Phones
          </h2>
          <p className="text-sm xs:text-base text-white/70 leading-relaxed">
            From repairs and trade-ins to setup and support — we&apos;re with you from purchase to
            end of life. Nine services designed to keep you connected.
          </p>
        </motion.div>

        {/* ============================================================
            SERVICES GRID
            ============================================================ */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 md:gap-5 lg:gap-6 mb-12 xs:mb-14 lg:mb-16">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 150 }}
              whileHover={{ y: -6 }}
              className="group relative bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-4 xs:p-5 md:p-6 transition-all overflow-hidden flex flex-col"
            >
              {/* Glow */}
              <motion.div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />

              {service.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] xs:text-[10px] font-bold uppercase tracking-wider z-10">
                  {service.badge}
                </span>
              )}

              <div className="relative z-10 flex flex-col flex-1">
                {/* Icon */}
                <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white mb-3 xs:mb-4 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-base xs:text-lg font-extrabold text-white mb-1.5 xs:mb-2">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-xs xs:text-sm text-white/70 leading-relaxed mb-3 xs:mb-4 flex-1">
                  {service.shortDescription}
                </p>

                {/* Price + duration */}
                <div className="flex items-center justify-between gap-2 mb-3 pt-3 border-t border-blue-900/30">
                  <div>
                    <p className="text-[9px] xs:text-[10px] text-white/50 uppercase font-semibold tracking-wide">
                      Price
                    </p>
                    <p className="text-xs xs:text-sm font-bold text-blue-400">
                      {service.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] xs:text-[10px] text-white/50 uppercase font-semibold tracking-wide">
                      Duration
                    </p>
                    <p className="text-xs xs:text-sm font-bold text-white flex items-center gap-1">
                      <ClockIcon sx={{ fontSize: 12 }} />
                      {service.duration}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openDetails(service)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 xs:px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-blue-900/40 text-white font-semibold text-[11px] xs:text-xs transition-colors"
                  >
                    <InfoIcon sx={{ fontSize: 14 }} />
                    Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openBooking(service)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 xs:px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] xs:text-xs transition-colors shadow-lg shadow-blue-900/50"
                  >
                    Book
                    <ArrowForwardIcon sx={{ fontSize: 14 }} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================================
            WHY CHOOSE OUR SERVICES — 4 pillars
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5 mb-12 xs:mb-14 lg:mb-16"
        >
          {[
            { icon: <VerifiedIcon />, title: 'Certified Experts', desc: 'Samsung-trained technicians' },
            { icon: <ShieldIcon />, title: 'Guaranteed Work', desc: '90-day repair warranty' },
            { icon: <ClockIcon />, title: 'Fast Turnaround', desc: 'Same-day options available' },
            { icon: <WhatsAppIcon />, title: '24/7 Support', desc: 'Always a message away' },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-blue-950/40 to-black border border-blue-900/40 hover:border-blue-600/60 rounded-2xl p-4 xs:p-5 flex items-center gap-3 transition-all"
            >
              <div className="w-11 h-11 xs:w-12 xs:h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                {pillar.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs xs:text-sm font-extrabold text-white truncate">
                  {pillar.title}
                </p>
                <p className="text-[10px] xs:text-xs text-white/60 truncate">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ============================================================
            CTA BANNER
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
              <StarIcon sx={{ fontSize: 14 }} />
              Book Today
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 xs:mb-3 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-sm xs:text-base text-white/90 mb-5 xs:mb-6 max-w-xl mx-auto">
              Book a service online or chat with us directly on WhatsApp. We&apos;ll confirm your
              appointment within minutes.
            </p>
            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3">
              <motion.button
                onClick={() => openBooking()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-white text-blue-700 font-bold text-sm xs:text-base shadow-lg hover:shadow-2xl transition-all"
              >
                <PhoneIcon fontSize="small" />
                Book a Service
              </motion.button>
              <motion.a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full bg-blue-950/40 backdrop-blur border-2 border-white/30 text-white font-bold text-sm xs:text-base hover:bg-blue-950/60 transition-all"
              >
                <WhatsAppIcon fontSize="small" />
                Chat on WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================
          SERVICE DETAILS MODAL (white bg, black text)
          ============================================================ */}
      <AnimatePresence>
        {detailsOpen && selectedService && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setDetailsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <button
                onClick={() => setDetailsOpen(false)}
                className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 text-black"
              >
                <CloseIcon fontSize="small" />
              </button>

              <div className="p-5 xs:p-6 sm:p-8">
                {selectedService.badge && (
                  <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    {selectedService.badge}
                  </span>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
                    {selectedService.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl xs:text-2xl font-extrabold text-black leading-tight">
                      {selectedService.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-sm font-bold text-blue-600">
                        {selectedService.price}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <ClockIcon sx={{ fontSize: 12 }} />
                        {selectedService.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm xs:text-base text-gray-700 leading-relaxed mb-4">
                  {selectedService.fullDescription}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    What&apos;s included
                  </p>
                  <ul className="space-y-1.5">
                    {selectedService.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-black"
                      >
                        <CheckCircleIcon
                          sx={{ fontSize: 18, color: '#2563eb', flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 pt-2">
                  <motion.button
                    onClick={() => {
                      setDetailsOpen(false);
                      openBooking(selectedService);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/40 transition-all"
                  >
                    <PhoneIcon fontSize="small" />
                    Book This Service
                  </motion.button>
                  <motion.a
                    href={getWhatsAppLink(selectedService.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all"
                  >
                    <WhatsAppIcon fontSize="small" />
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          BOOKING MODAL (white bg, black text)
          ============================================================ */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !loading && setBookingOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <div className="p-5 xs:p-6 sm:p-8">
                <button
                  onClick={() => !loading && setBookingOpen(false)}
                  className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 text-black"
                >
                  <CloseIcon fontSize="small" />
                </button>

                {/* Success/error banner */}
                {bookingStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-4 rounded-xl p-3 flex items-center gap-2 font-semibold text-sm ${
                      bookingStatus === 'success'
                        ? 'bg-blue-50 border border-blue-300 text-blue-700'
                        : 'bg-red-50 border border-red-300 text-red-700'
                    }`}
                  >
                    {bookingStatus === 'success' ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <ErrorIcon fontSize="small" />
                    )}
                    {bookingStatus === 'success'
                      ? 'Booking confirmed! We will contact you shortly.'
                      : 'Something went wrong. Please try again.'}
                  </motion.div>
                )}

                <div className="text-center mb-5">
                  <h2 className="text-xl xs:text-2xl font-extrabold text-blue-600">
                    Book a Service
                  </h2>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1">
                    We&apos;ll confirm your appointment within minutes
                  </p>
                </div>

                <form onSubmit={handleBooking} noValidate>
                  <Field
                    label="Full Name"
                    value={bookingForm.name}
                    onChange={(v) => setBookingForm({ ...bookingForm, name: v })}
                    onBlur={() => setBookingTouched((t) => ({ ...t, name: true }))}
                    error={bookingErrors.name}
                    touched={bookingShow('name')}
                    icon={<PersonIcon fontSize="small" />}
                    index={0}
                  />
                  <Field
                    label="Email"
                    value={bookingForm.email}
                    onChange={(v) => setBookingForm({ ...bookingForm, email: v })}
                    onBlur={() => setBookingTouched((t) => ({ ...t, email: true }))}
                    error={bookingErrors.email}
                    touched={bookingShow('email')}
                    type="email"
                    icon={<EmailIcon fontSize="small" />}
                    index={1}
                  />
                  <Field
                    label="Phone"
                    value={bookingForm.phone}
                    onChange={(v) => setBookingForm({ ...bookingForm, phone: v })}
                    onBlur={() => setBookingTouched((t) => ({ ...t, phone: true }))}
                    error={bookingErrors.phone}
                    touched={bookingShow('phone')}
                    type="tel"
                    icon={<PhoneCallIcon fontSize="small" />}
                    index={2}
                  />
                  <Field
                    label="Service"
                    value={bookingForm.service}
                    onChange={(v) => setBookingForm({ ...bookingForm, service: v })}
                    onBlur={() => setBookingTouched((t) => ({ ...t, service: true }))}
                    error={bookingErrors.service}
                    touched={bookingShow('service')}
                    index={3}
                    select
                    options={SERVICES.map((s) => ({ value: s.title, label: s.title }))}
                  />
                  <Field
                    label="Message"
                    value={bookingForm.message}
                    onChange={(v) => setBookingForm({ ...bookingForm, message: v })}
                    onBlur={() => setBookingTouched((t) => ({ ...t, message: true }))}
                    error={bookingErrors.message}
                    touched={bookingShow('message')}
                    index={4}
                    textarea
                    rows={3}
                  />

                  {/* Submit button — red when invalid, blue when valid */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={isBookingValid && !loading ? { scale: 1.02 } : {}}
                    whileTap={isBookingValid && !loading ? { scale: 0.98 } : {}}
                    className="mt-2"
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-500 ${
                        isBookingValid
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40'
                          : 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/40'
                      } ${loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
                    >
                      {loading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : isBookingValid ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircleIcon />
                          Confirm Booking
                        </motion.span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ErrorIcon />
                          {bookingSubmitted ? 'Fix errors to continue' : 'Confirm Booking'}
                        </span>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* Missing icon shim used above */
const ShieldIcon = WarrantyIcon;

