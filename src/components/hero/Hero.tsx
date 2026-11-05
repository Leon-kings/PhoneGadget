// Hero.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Close as CloseIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Star as StarIcon,
  LocalShipping as LocalShippingIcon,
  Verified as VerifiedIcon,
  SupportAgent as SupportAgentIcon,
  ShoppingBag as ShoppingBagIcon,
  WhatsApp as WhatsAppIcon,
  Memory as MemoryIcon,
  CameraAlt as CameraIcon,
  BatteryFull as BatteryIcon,
  Smartphone as SmartphoneIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

/* ============================================================
   TYPES
   ============================================================ */
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface InfoForm {
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Spec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  badge: string;
  image: string;
  category: string;
  specs: Spec[];
  features: string[];
  colorOptions: string[];
  storageOptions: string[];
  warranty: string;
  releaseDate: string;
}

/* ============================================================
   WHATSAPP CONFIG
   ============================================================ */
const WHATSAPP_NUMBER = "250787878787";

const getWhatsAppLink = (productName?: string) => {
  const msg = productName
    ? `Hello Samsung Store, I'm interested in buying the ${productName}. Please share more details.`
    : "Hello Samsung Store, I want to buy a product.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

/* ============================================================
   SLIDES DATA — Real Samsung product images
   ============================================================ */
const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Galaxy S24 Ultra",
    subtitle: "Titanium. Epic.",
    description:
      "The ultimate Galaxy experience with 200MP camera, Snapdragon 8 Gen 3, and Galaxy AI built for power users.",
    price: "2,006,000 RWF",
    badge: "New Release",
    category: "Smartphone",
    image:
      "https://m.media-amazon.com/images/I/71Nwtop9jtL._AC_UF1000,1000_QL80_.jpg",
    specs: [
      {
        icon: <CameraIcon />,
        label: "Camera",
        value: "200MP + 50MP + 12MP + 10MP",
      },
      { icon: <MemoryIcon />, label: "Processor", value: "Snapdragon 8 Gen 3" },
      {
        icon: <BatteryIcon />,
        label: "Battery",
        value: "5000 mAh · 45W fast charge",
      },
      { icon: <StorageIcon />, label: "Storage", value: "256GB / 512GB / 1TB" },
      {
        icon: <SmartphoneIcon />,
        label: "Display",
        value: '6.8" QHD+ Dynamic AMOLED 2X',
      },
      { icon: <SpeedIcon />, label: "RAM", value: "12 GB" },
    ],
    features: [
      "Galaxy AI with Circle to Search",
      "Titanium frame · Gorilla Armor glass",
      "Built-in S Pen",
      "IP68 water & dust resistance",
      "5G connectivity",
      "One UI 6.1 with 7 years of OS updates",
    ],
    colorOptions: [
      "Titanium Black",
      "Titanium Gray",
      "Titanium Violet",
      "Titanium Yellow",
    ],
    storageOptions: ["256 GB", "512 GB", "1 TB"],
    warranty: "1 Year Official Samsung Warranty",
    releaseDate: "January 2024",
  },
  {
    id: 2,
    title: "Galaxy Z Fold 5",
    subtitle: "Unfold Your World",
    description:
      "A tablet-sized screen in your pocket. Multitasking reimagined with Flex Mode and Snapdragon 8 Gen 2.",
    price: "2,395,000 RWF",
    badge: "Best Seller",
    category: "Foldable Smartphone",
    image:
      "https://buy.gazelle.com/cdn/shop/files/Galaxy_Z_Fold_5_-_Icy_blue_-_Overlap_Trans-cropped_b7c9cfc8-299e-4dfa-949e-9c8a385eb3f0.jpg?v=1757018715&width=1946",
    specs: [
      {
        icon: <CameraIcon />,
        label: "Camera",
        value: "50MP + 12MP + 10MP + 4MP front",
      },
      {
        icon: <MemoryIcon />,
        label: "Processor",
        value: "Snapdragon 8 Gen 2 for Galaxy",
      },
      {
        icon: <BatteryIcon />,
        label: "Battery",
        value: "4400 mAh · 25W fast charge",
      },
      { icon: <StorageIcon />, label: "Storage", value: "256GB / 512GB / 1TB" },
      {
        icon: <SmartphoneIcon />,
        label: "Display",
        value: '7.6" main + 6.2" cover AMOLED',
      },
      { icon: <SpeedIcon />, label: "RAM", value: "12 GB" },
    ],
    features: [
      "Flex Mode with hands-free multitasking",
      "Slimmer, lighter hinge design",
      "Built-in S Pen support",
      "IPX8 water resistance",
      "5G connectivity",
      "PC-like productivity with Multi Window",
    ],
    colorOptions: ["Icy Blue", "Phantom Black", "Cream"],
    storageOptions: ["256 GB", "512 GB", "1 TB"],
    warranty: "1 Year Official Samsung Warranty",
    releaseDate: "July 2023",
  },
  {
    id: 3,
    title: "Galaxy Watch 6",
    subtitle: "Your Health, Your Way",
    description:
      "Advanced sleep coaching, BioActive sensor, and sapphire crystal glass for a smarter, healthier you.",
    price: "399,000 RWF",
    badge: "Hot Deal",
    category: "Smartwatch",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLbj2mK5SXvKFj60RCg8XwIvn5GvVlR1gc1FFYIoI8Chp7D_3UPJkzno&s=10",
    specs: [
      {
        icon: <CameraIcon />,
        label: "Sensor",
        value: "BioActive · ECG · Temperature",
      },
      { icon: <MemoryIcon />, label: "Processor", value: "Exynos W930" },
      { icon: <BatteryIcon />, label: "Battery", value: "425 mAh · up to 40h" },
      { icon: <StorageIcon />, label: "Storage", value: "16 GB + 2 GB RAM" },
      {
        icon: <SmartphoneIcon />,
        label: "Display",
        value: '1.5" Super AMOLED · Sapphire Glass',
      },
      { icon: <SpeedIcon />, label: "OS", value: "Wear OS 4 + One UI 5 Watch" },
    ],
    features: [
      "Advanced sleep coaching & tracking",
      "Personalized Heart Rate Zone",
      "Body composition analysis",
      "5 ATM + IP68 water resistance",
      "Bluetooth 5.3 · Wi-Fi · NFC",
      "Sapphire crystal glass",
    ],
    colorOptions: ["Graphite", "Gold", "Silver"],
    storageOptions: ["16 GB"],
    warranty: "1 Year Official Samsung Warranty",
    releaseDate: "August 2023",
  },
  {
    id: 4,
    title: "Galaxy Buds Pro",
    subtitle: "Sound That Surrounds",
    description:
      "Intelligent ANC with 360° audio and crystal-clear call quality for an immersive listening experience.",
    price: "199,000 RWF",
    badge: "Limited Offer",
    category: "Wireless Earbuds",
    image:
      "https://i5.walmartimages.com/seo/Samsung-Galaxy-Buds4-Pro-Black_a15892d4-41ca-4839-9ac1-57aed4181ae6.3c234a07110bf2964c4dd6f62a36083a.jpeg",
    specs: [
      { icon: <CameraIcon />, label: "Drivers", value: "2-way · 11mm + 6.5mm" },
      { icon: <MemoryIcon />, label: "Chip", value: "BoraSoC" },
      {
        icon: <BatteryIcon />,
        label: "Battery",
        value: "61 mAh buds · 472 mAh case",
      },
      {
        icon: <StorageIcon />,
        label: "Audio",
        value: "360° Audio · ANC · AAC/SSC",
      },
      {
        icon: <SmartphoneIcon />,
        label: "Mic",
        value: "3 mics + Voice Pickup Unit",
      },
      {
        icon: <SpeedIcon />,
        label: "Connectivity",
        value: "Bluetooth 5.0 · Auto Switch",
      },
    ],
    features: [
      "Intelligent ANC with 4 levels",
      "360° Audio with head tracking",
      "Up to 28h total playtime with case",
      "IPX7 water resistance",
      "Voice Detect & Auto Switch",
      "Fast charging · Wireless charging",
    ],
    colorOptions: ["Phantom Black", "Phantom Silver", "Phantom Violet"],
    storageOptions: ["Standard"],
    warranty: "1 Year Official Samsung Warranty",
    releaseDate: "January 2021",
  },
];

/* ============================================================
   VALIDATION
   ============================================================ */
const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string): boolean =>
  /^\+?[\d\s-]{10,15}$/.test(phone);

const getContactErrors = (form: ContactForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 3)
    errors.name = "Name must be at least 3 characters";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email format";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!validatePhone(form.phone))
    errors.phone = "Invalid phone number (10-15 digits)";
  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
};

const getInfoErrors = (form: InfoForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.fullname.trim()) errors.fullname = "Full name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email format";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!validatePhone(form.phone)) errors.phone = "Invalid phone number";
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
};

/* ============================================================
   FIELD COMPONENT (used in white modals → dark text)
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
}

const Field: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = "text",
  icon,
  index = 0,
  textarea = false,
  rows = 4,
}) => {
  const showError = !!touched && !!error;
  const showValid = !!touched && !error && value.trim() !== "";
  const borderClass = showError
    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
    : showValid
      ? "border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
      : "border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300 }}
      className="w-full mb-4"
    >
      <label className="block text-sm font-semibold text-black mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && !textarea && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-colors ${
              showError
                ? "text-red-500"
                : showValid
                  ? "text-blue-600"
                  : "text-blue-600"
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
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`w-full ${icon ? "pl-11" : "pl-4"} pr-10 py-3 rounded-xl border-2 bg-white text-black outline-none transition-all duration-300 placeholder-gray-400 ${borderClass}`}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )}
        {!textarea && touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {showValid ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircleIcon fontSize="small" sx={{ color: "#2563eb" }} />
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <ErrorIcon fontSize="small" sx={{ color: "#ef4444" }} />
              </motion.div>
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
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
            animate={{ opacity: 1, y: 0, height: "auto" }}
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
   SUBMIT BUTTON
   ============================================================ */
interface SubmitButtonProps {
  isValid: boolean;
  loading: boolean;
  label: string;
  touched: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isValid,
  loading,
  label,
  touched,
}) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2 }}
    whileHover={isValid && !loading ? { scale: 1.02 } : {}}
    whileTap={isValid && !loading ? { scale: 0.98 } : {}}
    className="mt-2"
  >
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-500 ${
        isValid
          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40"
          : "bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/40"
      } ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      ) : isValid ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="flex items-center gap-2"
        >
          <CheckCircleIcon />
          {label}
        </motion.span>
      ) : (
        <span className="flex items-center gap-2">
          <ErrorIcon />
          {touched ? "Fix errors to continue" : label}
        </span>
      )}
    </button>
  </motion.div>
);

/* ============================================================
   MODAL WRAPPER — WHITE bg, BLACK text
   ============================================================ */
interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle: string;
  status?: "success" | "error" | null;
  wide?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  children,
  title,
  subtitle,
  status,
  wide = false,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className={`relative bg-white rounded-3xl shadow-2xl w-full ${
            wide ? "max-w-2xl" : "max-w-md"
          } max-h-[92vh] overflow-y-auto`}
          initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 60, rotateX: -15 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
          <div className="relative p-5 xs:p-6 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 text-black"
            >
              <CloseIcon fontSize="small" />
            </button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 rounded-xl p-3 flex items-center gap-2 font-semibold text-sm ${
                  status === "success"
                    ? "bg-blue-50 border border-blue-300 text-blue-700"
                    : "bg-red-50 border border-red-300 text-red-700"
                }`}
              >
                {status === "success" ? (
                  <CheckCircleIcon fontSize="small" />
                ) : (
                  <ErrorIcon fontSize="small" />
                )}
                {status === "success"
                  ? "Success! Your request was submitted."
                  : "Something went wrong. Try again."}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-5 xs:mb-6"
            >
              <h2 className="text-xl xs:text-2xl font-extrabold text-blue-600">
                {title}
              </h2>
              <p className="text-xs xs:text-sm text-gray-600 mt-1">
                {subtitle}
              </p>
            </motion.div>
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ============================================================
   PRODUCT DETAILS MODAL — bg-white, text-black
   ============================================================ */
interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  slide: Slide | null;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  open,
  onClose,
  slide,
}) => {
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "options">(
    "specs",
  );

  useEffect(() => {
    if (open) setActiveTab("specs");
  }, [open, slide?.id]);

  if (!slide) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 60 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-20 text-black"
            >
              <CloseIcon fontSize="small" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 p-5 xs:p-6 sm:p-8">
              {/* LEFT: Product image */}
              <div className="relative bg-gray-50 rounded-2xl p-4 xs:p-6 flex items-center justify-center min-h-[240px] xs:min-h-[280px] md:min-h-[340px]">
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-500/5"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="relative z-10 w-full h-full object-contain max-h-[240px] xs:max-h-[280px] md:max-h-[320px]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold">
                    {slide.badge}
                  </span>
                </div>
              </div>

              {/* RIGHT: Info + tabs */}
              <div className="flex flex-col">
                <span className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                  {slide.category}
                </span>
                <h3 className="text-xl xs:text-2xl font-extrabold text-black mb-1">
                  {slide.title}
                </h3>
                <p className="text-sm xs:text-base font-bold text-blue-600 mb-2">
                  {slide.subtitle}
                </p>
                <p className="text-xs xs:text-sm text-gray-600 mb-3 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl xs:text-3xl font-extrabold text-blue-600">
                    {slide.price}
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-3 border-b border-gray-200">
                  {[
                    { key: "specs", label: "Specs" },
                    { key: "features", label: "Features" },
                    { key: "options", label: "Options" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
                      className={`relative px-3 py-2 text-xs xs:text-sm font-bold transition-colors ${
                        activeTab === tab.key
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[180px] xs:min-h-[200px]">
                  <AnimatePresence mode="wait">
                    {activeTab === "specs" && (
                      <motion.div
                        key="specs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 gap-2"
                      >
                        {slide.specs.map((spec, i) => (
                          <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 bg-gray-50 rounded-lg p-2.5"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                              {spec.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] xs:text-xs font-semibold text-gray-500 uppercase">
                                {spec.label}
                              </p>
                              <p className="text-xs xs:text-sm font-bold text-black truncate">
                                {spec.value}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === "features" && (
                      <motion.ul
                        key="features"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-2"
                      >
                        {slide.features.map((feature, i) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 text-xs xs:text-sm text-black"
                          >
                            <CheckCircleIcon
                              fontSize="small"
                              sx={{ color: "#2563eb", marginTop: "2px" }}
                            />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                    {activeTab === "options" && (
                      <motion.div
                        key="options"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">
                            Colors
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {slide.colorOptions.map((color) => (
                              <span
                                key={color}
                                className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-semibold text-black"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1.5">
                            Storage
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {slide.storageOptions.map((opt) => (
                              <span
                                key={opt}
                                className="px-2.5 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-700 border border-blue-200"
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-[10px] font-semibold text-gray-500 uppercase">
                              Warranty
                            </p>
                            <p className="text-xs font-bold text-black">
                              {slide.warranty}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-[10px] font-semibold text-gray-500 uppercase">
                              Released
                            </p>
                            <p className="text-xs font-bold text-black">
                              {slide.releaseDate}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col xs:flex-row gap-2 mt-4">
                  <motion.a
                    href={getWhatsAppLink(slide.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs xs:text-sm shadow-lg shadow-blue-500/30 transition-all"
                  >
                    <WhatsAppIcon fontSize="small" />
                    Buy on WhatsApp
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      onClose();
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-blue-600 text-blue-600 font-bold text-xs xs:text-sm hover:bg-blue-50 transition-all"
                  >
                    <InfoIcon fontSize="small" />
                    Close
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Related products */}
            <div className="px-5 xs:px-6 sm:px-8 pb-5 xs:pb-6 sm:pb-8">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm xs:text-base font-extrabold text-black mb-3">
                  Related Products
                </h4>
                <div className="grid grid-cols-3 gap-2 xs:gap-3">
                  {SLIDES.filter((s) => s.id !== slide.id).map((related) => (
                    <motion.div
                      key={related.id}
                      whileHover={{ y: -3 }}
                      className="bg-gray-50 rounded-xl p-2 xs:p-3 cursor-pointer"
                    >
                      <div className="aspect-square flex items-center justify-center mb-1.5">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <p className="text-[10px] xs:text-xs font-bold text-black truncate">
                        {related.title}
                      </p>
                      <p className="text-[9px] xs:text-[11px] font-semibold text-blue-600">
                        {related.price}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   HERO COMPONENT
   ============================================================ */
export const Hero: React.FC = () => {
  /* ---------- Carousel ---------- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  /* ---------- Modals ---------- */
  const [contactOpen, setContactOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(
    null,
  );

  /* ---------- Contact form ---------- */
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactTouched, setContactTouched] = useState<Record<string, boolean>>(
    {},
  );
  const [contactSubmitted, setContactSubmitted] = useState(false);

  /* ---------- Info form ---------- */
  const [infoForm, setInfoForm] = useState<InfoForm>({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [infoTouched, setInfoTouched] = useState<Record<string, boolean>>({});
  const [infoSubmitted, setInfoSubmitted] = useState(false);

  /* ---------- Toast ---------- */
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  /* ---------- Derived ---------- */
  const contactErrors = useMemo(
    () => getContactErrors(contactForm),
    [contactForm],
  );
  const infoErrors = useMemo(() => getInfoErrors(infoForm), [infoForm]);
  const isContactValid = Object.keys(contactErrors).length === 0;
  const isInfoValid = Object.keys(infoErrors).length === 0;

  const contactShow = (f: string) => contactSubmitted || !!contactTouched[f];
  const infoShow = (f: string) => infoSubmitted || !!infoTouched[f];

  /* ---------- Slide nav ---------- */
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (detailsOpen || contactOpen || infoOpen) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, detailsOpen, contactOpen, infoOpen]);

  useEffect(() => {
    if (snackbar.open) {
      const t = setTimeout(
        () => setSnackbar((s) => ({ ...s, open: false })),
        3500,
      );
      return () => clearTimeout(t);
    }
  }, [snackbar]);

  /* ---------- Handlers ---------- */
  const openDetails = (slide: Slide) => {
    setSelectedSlide(slide);
    setDetailsOpen(true);
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setContactTouched({ name: true, email: true, phone: true, message: true });
    if (!isContactValid) return;
    setLoading(true);
    setModalStatus(null);
    try {
      await axios.post("/api/contact", contactForm);
      setModalStatus("success");
      setSnackbar({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
      setTimeout(() => {
        setContactOpen(false);
        setContactForm({ name: "", email: "", phone: "", message: "" });
        setContactTouched({});
        setContactSubmitted(false);
        setModalStatus(null);
      }, 1200);
    } catch (error: any) {
      setModalStatus("error");
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to send message.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSubmitted(true);
    setInfoTouched({
      fullname: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });
    if (!isInfoValid) return;
    setLoading(true);
    setModalStatus(null);
    try {
      await axios.post("/api/info", infoForm);
      setModalStatus("success");
      setSnackbar({
        open: true,
        message: "Info request submitted!",
        severity: "success",
      });
      setTimeout(() => {
        setInfoOpen(false);
        setInfoForm({
          fullname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setInfoTouched({});
        setInfoSubmitted(false);
        setModalStatus(null);
      }, 1200);
    } catch (error: any) {
      setModalStatus("error");
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to submit request.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const slide = SLIDES[currentSlide];

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <>
      {/* ==================== HERO SECTION (black bg, white text) ==================== */}
      <section className="relative overflow-hidden bg-black min-h-[600px] xs:min-h-[640px] sm:min-h-[700px] lg:min-h-[780px]">
        {/* Blue-only glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -left-32 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, #1F6FEB25, transparent 70%)",
            }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, #1428A025, transparent 70%)",
            }}
            animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 py-8 xs:py-10 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 items-center">
            {/* ---------- LEFT: Text ---------- */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/50 mb-4 xs:mb-5"
                >
                  <StarIcon sx={{ fontSize: 14 }} />
                  {slide.badge}
                </motion.div>

                {/* Title — blue gradient text (head only) */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-2 xs:mb-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle — white */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Description — white */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm xs:text-base text-white/80 mb-4 xs:mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center lg:justify-start gap-3 xs:gap-4 mb-5 xs:mb-7"
                >
                  <div className="text-left">
                    <p className="text-[10px] xs:text-xs text-white/60 font-medium uppercase tracking-wide">
                      Starting at
                    </p>
                    <p className="text-2xl xs:text-3xl font-extrabold text-white">
                      {slide.price}
                    </p>
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-2 xs:gap-3"
                >
                  <motion.a
                    href={getWhatsAppLink(slide.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 30px rgba(31,111,235,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full text-white font-bold text-sm xs:text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/50 transition-all"
                  >
                    <WhatsAppIcon fontSize="small" />
                    Buy Now
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openDetails(slide)}
                    className="w-full xs:w-auto flex items-center justify-center gap-2 px-5 xs:px-6 py-3 rounded-full text-white font-bold text-sm xs:text-base bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all"
                  >
                    <InfoIcon fontSize="small" />
                    More Info
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ---------- RIGHT: Real product image ---------- */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={slide.id}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.7, rotate: direction * 15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: -direction * 15 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-[220px] xs:w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] xl:w-[420px] h-[320px] xs:h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[620px]"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-blue-600"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="relative z-10 w-full h-full flex items-center justify-center"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {!imageError[slide.id] ? (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-contain drop-shadow-2xl cursor-pointer"
                        onError={() =>
                          setImageError((prev) => ({
                            ...prev,
                            [slide.id]: true,
                          }))
                        }
                        onClick={() => openDetails(slide)}
                        loading="lazy"
                      />
                    ) : (
                      <button
                        onClick={() => openDetails(slide)}
                        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-black rounded-3xl border-2 border-blue-600/30 p-6 text-center hover:border-blue-500 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-4">
                          <ShoppingBagIcon
                            sx={{ fontSize: 40, color: "#1F6FEB" }}
                          />
                        </div>
                        <p className="text-white font-bold text-lg mb-1">
                          {slide.title}
                        </p>
                        <p className="text-white/60 text-sm">
                          Tap to view details
                        </p>
                      </button>
                    )}
                  </motion.div>

                  {/* Chips — white pill, black text */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 xs:top-8 left-0 bg-white rounded-xl shadow-xl px-2.5 xs:px-3 py-1.5 xs:py-2 flex items-center gap-1.5 z-20"
                  >
                    <VerifiedIcon sx={{ fontSize: 14, color: "#2563eb" }} />
                    <span className="text-[10px] xs:text-xs font-bold text-black">
                      Official Store
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-8 xs:bottom-12 right-0 bg-white rounded-xl shadow-xl px-2.5 xs:px-3 py-1.5 xs:py-2 flex items-center gap-1.5 z-20"
                  >
                    <LocalShippingIcon
                      sx={{ fontSize: 14, color: "#2563eb" }}
                    />
                    <span className="text-[10px] xs:text-xs font-bold text-black">
                      Free Shipping
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Trust badges ---------- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 md:gap-4 mt-8 xs:mt-10 lg:mt-14">
            {[
              {
                icon: <LocalShippingIcon />,
                title: "Free Shipping",
                desc: "On orders 50,000 RWF+",
              },
              {
                icon: <VerifiedIcon />,
                title: "Official Warranty",
                desc: "1 year coverage",
              },
              {
                icon: <SupportAgentIcon />,
                title: "24/7 Support",
                desc: "Always here to help",
              },
              {
                icon: <ShoppingBagIcon />,
                title: "Easy Returns",
                desc: "30-day policy",
              },
            ].map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 24px rgba(31,111,235,0.2)",
                }}
                className="bg-gray-950 border border-blue-900/40 rounded-2xl p-3 xs:p-4 flex flex-col xs:flex-row items-center xs:items-start gap-2 xs:gap-3 transition-all"
              >
                <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                  {badge.icon}
                </div>
                <div className="text-center xs:text-left">
                  <p className="font-bold text-white text-xs xs:text-sm">
                    {badge.title}
                  </p>
                  <p className="text-[10px] xs:text-xs text-white/60">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT DETAILS MODAL ==================== */}
      <ProductDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        slide={selectedSlide}
      />

      {/* ==================== CONTACT MODAL ==================== */}
      <ModalWrapper
        open={contactOpen}
        onClose={() => !loading && setContactOpen(false)}
        title="Contact Sales"
        subtitle="Talk to our Samsung experts"
        status={modalStatus}
      >
        <form onSubmit={handleContact} noValidate>
          <Field
            label="Name"
            value={contactForm.name}
            onChange={(v) => setContactForm({ ...contactForm, name: v })}
            onBlur={() => setContactTouched((t) => ({ ...t, name: true }))}
            error={contactErrors.name}
            touched={contactShow("name")}
            icon={<PersonIcon fontSize="small" />}
            index={0}
          />
          <Field
            label="Email"
            value={contactForm.email}
            onChange={(v) => setContactForm({ ...contactForm, email: v })}
            onBlur={() => setContactTouched((t) => ({ ...t, email: true }))}
            error={contactErrors.email}
            touched={contactShow("email")}
            type="email"
            icon={<EmailIcon fontSize="small" />}
            index={1}
          />
          <Field
            label="Phone"
            value={contactForm.phone}
            onChange={(v) => setContactForm({ ...contactForm, phone: v })}
            onBlur={() => setContactTouched((t) => ({ ...t, phone: true }))}
            error={contactErrors.phone}
            touched={contactShow("phone")}
            type="tel"
            icon={<PhoneIcon fontSize="small" />}
            index={2}
          />
          <Field
            label="Message"
            value={contactForm.message}
            onChange={(v) => setContactForm({ ...contactForm, message: v })}
            onBlur={() => setContactTouched((t) => ({ ...t, message: true }))}
            error={contactErrors.message}
            touched={contactShow("message")}
            index={3}
            textarea
            rows={4}
          />
          <SubmitButton
            isValid={isContactValid}
            loading={loading}
            label="Send Message"
            touched={contactSubmitted}
          />
        </form>
      </ModalWrapper>

      {/* ==================== INFO MODAL ==================== */}
      <ModalWrapper
        open={infoOpen}
        onClose={() => !loading && setInfoOpen(false)}
        title="Request Info"
        subtitle="Get product details in your inbox"
        status={modalStatus}
      >
        <form onSubmit={handleInfo} noValidate>
          <Field
            label="Full Name"
            value={infoForm.fullname}
            onChange={(v) => setInfoForm({ ...infoForm, fullname: v })}
            onBlur={() => setInfoTouched((t) => ({ ...t, fullname: true }))}
            error={infoErrors.fullname}
            touched={infoShow("fullname")}
            icon={<PersonIcon fontSize="small" />}
            index={0}
          />
          <Field
            label="Email"
            value={infoForm.email}
            onChange={(v) => setInfoForm({ ...infoForm, email: v })}
            onBlur={() => setInfoTouched((t) => ({ ...t, email: true }))}
            error={infoErrors.email}
            touched={infoShow("email")}
            type="email"
            icon={<EmailIcon fontSize="small" />}
            index={1}
          />
          <Field
            label="Phone"
            value={infoForm.phone}
            onChange={(v) => setInfoForm({ ...infoForm, phone: v })}
            onBlur={() => setInfoTouched((t) => ({ ...t, phone: true }))}
            error={infoErrors.phone}
            touched={infoShow("phone")}
            type="tel"
            icon={<PhoneIcon fontSize="small" />}
            index={2}
          />
          <Field
            label="Subject"
            value={infoForm.subject}
            onChange={(v) => setInfoForm({ ...infoForm, subject: v })}
            onBlur={() => setInfoTouched((t) => ({ ...t, subject: true }))}
            error={infoErrors.subject}
            touched={infoShow("subject")}
            icon={<InfoIcon fontSize="small" />}
            index={3}
          />
          <Field
            label="Message"
            value={infoForm.message}
            onChange={(v) => setInfoForm({ ...infoForm, message: v })}
            onBlur={() => setInfoTouched((t) => ({ ...t, message: true }))}
            error={infoErrors.message}
            touched={infoShow("message")}
            index={4}
            textarea
            rows={3}
          />
          <SubmitButton
            isValid={isInfoValid}
            loading={loading}
            label="Request Info"
            touched={infoSubmitted}
          />
        </form>
      </ModalWrapper>

      {/* ==================== TOAST ==================== */}
      <AnimatePresence>
        {snackbar.open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 xs:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md"
          >
            <div
              className={`flex items-center gap-3 px-4 xs:px-5 py-3 xs:py-4 rounded-2xl shadow-2xl text-white font-semibold ${
                snackbar.severity === "success"
                  ? "bg-blue-600 border border-blue-500"
                  : "bg-red-600 border border-red-500"
              }`}
            >
              {snackbar.severity === "success" ? (
                <CheckCircleIcon />
              ) : (
                <ErrorIcon />
              )}
              <span className="flex-1 text-xs xs:text-sm">
                {snackbar.message}
              </span>
              <button
                onClick={() => setSnackbar((s) => ({ ...s, open: false }))}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
