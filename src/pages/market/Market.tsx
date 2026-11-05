// Market.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Close as CloseIcon,
  ShoppingCart as CartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  PhoneAndroid as PhoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Headphones as HeadphonesIcon,
  Apps as AppsIcon,
  WhatsApp as WhatsAppIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneCallIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Memory as MemoryIcon,
  CameraAlt as CameraIcon,
  BatteryFull as BatteryIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

/* ============================================================
   TYPES
   ============================================================ */
type Category = 'all' | 'phone' | 'tablet' | 'computer' | 'accessories';

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, 'all'>;
  price: number; // in RWF
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  specs: { icon: React.ReactNode; label: string; value: string }[];
  colors: string[];
  storage?: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutForm {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
}

interface FormErrors {
  [key: string]: string;
}

/* ============================================================
   CATEGORIES
   ============================================================ */
const CATEGORIES: { key: Category; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Products', icon: <AppsIcon /> },
  { key: 'phone', label: 'Phones', icon: <PhoneIcon /> },
  { key: 'tablet', label: 'Tablets', icon: <TabletIcon /> },
  { key: 'computer', label: 'Computers', icon: <LaptopIcon /> },
  { key: 'accessories', label: 'Accessories', icon: <HeadphonesIcon /> },
];

/* ============================================================
   PRODUCTS DATA
   ============================================================ */
const PRODUCTS: Product[] = [
  // ---------- PHONES ----------
  {
    id: 1,
    name: 'Galaxy S24 Ultra',
    category: 'phone',
    price: 2006000,
    oldPrice: 2200000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s928bztqmea/gallery/levant-galaxy-s24-s928-sm-s928bztqmea-539423605?$650_519_PNG$',
    rating: 4.9,
    reviews: 1248,
    badge: 'New',
    description: 'Flagship Galaxy with 200MP camera, Snapdragon 8 Gen 3, and Galaxy AI.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '200MP + 50MP + 12MP + 10MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { icon: <BatteryIcon />, label: 'Battery', value: '5000 mAh · 45W' },
      { icon: <StorageIcon />, label: 'Storage', value: '256GB / 512GB / 1TB' },
    ],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'],
    storage: ['256GB', '512GB', '1TB'],
  },
  {
    id: 2,
    name: 'Galaxy S24+',
    category: 'phone',
    price: 1450000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s926bzkdmea/gallery/levant-galaxy-s24-plus-s926-sm-s926bzkdmea-539423715?$650_519_PNG$',
    rating: 4.8,
    reviews: 862,
    description: 'Big-screen flagship with Snapdragon 8 Gen 3 and Galaxy AI.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '50MP + 12MP + 10MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { icon: <BatteryIcon />, label: 'Battery', value: '4900 mAh · 45W' },
      { icon: <StorageIcon />, label: 'Storage', value: '256GB / 512GB' },
    ],
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet'],
    storage: ['256GB', '512GB'],
  },
  {
    id: 3,
    name: 'Galaxy S24',
    category: 'phone',
    price: 1100000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s921bzkdmea/gallery/levant-galaxy-s24-s921-sm-s921bzkdmea-539423725?$650_519_PNG$',
    rating: 4.7,
    reviews: 534,
    description: 'Compact flagship with Exynos 2400 and Galaxy AI features.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '50MP + 12MP + 10MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Exynos 2400' },
      { icon: <BatteryIcon />, label: 'Battery', value: '4000 mAh · 25W' },
      { icon: <StorageIcon />, label: 'Storage', value: '128GB / 256GB / 512GB' },
    ],
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet'],
    storage: ['128GB', '256GB', '512GB'],
  },
  {
    id: 4,
    name: 'Galaxy Z Fold 5',
    category: 'phone',
    price: 2395000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-f946bzkdmea/gallery/levant-galaxy-z-fold5-f946-sm-f946bzkdmea-537378630?$650_519_PNG$',
    rating: 4.8,
    reviews: 721,
    badge: 'Foldable',
    description: 'Tablet-sized foldable with Flex Mode multitasking and Snapdragon 8 Gen 2.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '50MP + 12MP + 10MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 8 Gen 2 for Galaxy' },
      { icon: <BatteryIcon />, label: 'Battery', value: '4400 mAh · 25W' },
      { icon: <StorageIcon />, label: 'Storage', value: '256GB / 512GB / 1TB' },
    ],
    colors: ['Icy Blue', 'Phantom Black', 'Cream'],
    storage: ['256GB', '512GB', '1TB'],
  },
  {
    id: 5,
    name: 'Galaxy Z Flip 5',
    category: 'phone',
    price: 1650000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-f731bzkdmea/gallery/levant-galaxy-z-flip5-f731-sm-f731bzkdmea-537378922?$650_519_PNG$',
    rating: 4.6,
    reviews: 389,
    description: 'Pocketable flip phone with Flex Window and hands-free camera.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '12MP + 12MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 8 Gen 2' },
      { icon: <BatteryIcon />, label: 'Battery', value: '3700 mAh · 25W' },
      { icon: <StorageIcon />, label: 'Storage', value: '256GB / 512GB' },
    ],
    colors: ['Mint', 'Graphite', 'Cream', 'Lavender'],
    storage: ['256GB', '512GB'],
  },
  {
    id: 6,
    name: 'Galaxy A54 5G',
    category: 'phone',
    price: 450000,
    oldPrice: 520000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-a546ezkamea/gallery/levant-galaxy-a54-5g-a546-sm-a546ezkamea-538321623?$650_519_PNG$',
    rating: 4.5,
    reviews: 2103,
    badge: 'Popular',
    description: 'Mid-range hero with 50MP OIS camera and Super AMOLED 120Hz.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '50MP + 12MP + 5MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Exynos 1380' },
      { icon: <BatteryIcon />, label: 'Battery', value: '5000 mAh · 25W' },
      { icon: <StorageIcon />, label: 'Storage', value: '128GB / 256GB' },
    ],
    colors: ['Awesome Lime', 'Awesome Graphite', 'Awesome Violet'],
    storage: ['128GB', '256GB'],
  },
  {
    id: 7,
    name: 'Galaxy A34 5G',
    category: 'phone',
    price: 320000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-a346bzkdmea/gallery/levant-galaxy-a34-5g-a346-sm-a346bzkdmea-537357776?$650_519_PNG$',
    rating: 4.4,
    reviews: 1456,
    description: 'Affordable 5G with 48MP OIS camera and 120Hz AMOLED display.',
    specs: [
      { icon: <CameraIcon />, label: 'Camera', value: '48MP + 8MP + 5MP' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Dimensity 1080' },
      { icon: <BatteryIcon />, label: 'Battery', value: '5000 mAh · 25W' },
      { icon: <StorageIcon />, label: 'Storage', value: '128GB / 256GB' },
    ],
    colors: ['Awesome Graphite', 'Awesome Silver', 'Awesome Lime'],
    storage: ['128GB', '256GB'],
  },

  // ---------- TABLETS ----------
  {
    id: 8,
    name: 'Galaxy Tab S9 Ultra',
    category: 'tablet',
    price: 1450000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-x910nzaamea/gallery/levant-galaxy-tab-s9-ultra-x910-sm-x910nzaamea-537416677?$650_519_PNG$',
    rating: 4.8,
    reviews: 642,
    badge: 'Premium',
    description: '14.6" AMOLED tablet with S Pen and Snapdragon 8 Gen 2.',
    specs: [
      { icon: <CameraIcon />, label: 'Display', value: '14.6" AMOLED 120Hz' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 8 Gen 2' },
      { icon: <BatteryIcon />, label: 'Battery', value: '11,200 mAh · 45W' },
      { icon: <StorageIcon />, label: 'Storage', value: '256GB / 512GB / 1TB' },
    ],
    colors: ['Graphite', 'Beige'],
    storage: ['256GB', '512GB', '1TB'],
  },
  {
    id: 9,
    name: 'Galaxy Tab S9',
    category: 'tablet',
    price: 950000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-x710nzaamea/gallery/levant-galaxy-tab-s9-x710-sm-x710nzaamea-537416821?$650_519_PNG$',
    rating: 4.7,
    reviews: 421,
    description: '11" AMOLED tablet with S Pen and IP68 water resistance.',
    specs: [
      { icon: <CameraIcon />, label: 'Display', value: '11" AMOLED 120Hz' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 8 Gen 2' },
      { icon: <BatteryIcon />, label: 'Battery', value: '8,400 mAh · 45W' },
      { icon: <StorageIcon />, label: 'Storage', value: '128GB / 256GB' },
    ],
    colors: ['Graphite', 'Beige'],
    storage: ['128GB', '256GB'],
  },
  {
    id: 10,
    name: 'Galaxy Tab A9+',
    category: 'tablet',
    price: 320000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-x210nzaamea/gallery/levant-galaxy-tab-a9-plus-x210-sm-x210nzaamea-539424479?$650_519_PNG$',
    rating: 4.3,
    reviews: 891,
    badge: 'Budget',
    description: 'Affordable 11" tablet for entertainment and productivity.',
    specs: [
      { icon: <CameraIcon />, label: 'Display', value: '11" LCD 90Hz' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Snapdragon 695' },
      { icon: <BatteryIcon />, label: 'Battery', value: '7,040 mAh · 15W' },
      { icon: <StorageIcon />, label: 'Storage', value: '64GB / 128GB' },
    ],
    colors: ['Graphite', 'Silver'],
    storage: ['64GB', '128GB'],
  },

  // ---------- COMPUTERS ----------
  {
    id: 11,
    name: 'Galaxy Book4 Pro',
    category: 'computer',
    price: 2350000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/np960xgl-xg2me/gallery/levant-galaxy-book4-pro-360-np960xgl-xg2me-539423093?$650_519_PNG$',
    rating: 4.7,
    reviews: 234,
    badge: 'New',
    description: '16" 3K AMOLED laptop with Intel Core Ultra and Galaxy AI.',
    specs: [
      { icon: <CameraIcon />, label: 'Display', value: '16" 3K AMOLED Touch' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Intel Core Ultra 7' },
      { icon: <BatteryIcon />, label: 'Battery', value: '76Wh · up to 21h' },
      { icon: <StorageIcon />, label: 'Storage', value: '512GB SSD · 16GB RAM' },
    ],
    colors: ['Moonstone Gray', 'Platinum Silver'],
  },
  {
    id: 12,
    name: 'Galaxy Book4 360',
    category: 'computer',
    price: 1650000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/np750qgk-kg2me/gallery/levant-galaxy-book4-360-np750qgk-kg2me-539423311?$650_519_PNG$',
    rating: 4.6,
    reviews: 189,
    description: '15.6" 2-in-1 convertible laptop with S Pen support.',
    specs: [
      { icon: <CameraIcon />, label: 'Display', value: '15.6" FHD AMOLED Touch' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Intel Core 5' },
      { icon: <BatteryIcon />, label: 'Battery', value: '68Wh · up to 18h' },
      { icon: <StorageIcon />, label: 'Storage', value: '512GB SSD · 8GB RAM' },
    ],
    colors: ['Moonstone Gray', 'Platinum Silver'],
  },
  {
    id: 13,
    name: 'Galaxy Book4',
    category: 'computer',
    price: 1250000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/np750xgj-kg2me/gallery/levant-galaxy-book4-np750xgj-kg2me-539423223?$650_519_PNG$',
    rating: 4.4,
    reviews: 156,
    description: '15.6" FHD laptop with Intel Core and long battery life.',
    specs: [
      { icon: <CameraIcon />, label: 'Display', value: '15.6" FHD IPS' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Intel Core 5' },
      { icon: <BatteryIcon />, label: 'Battery', value: '54Wh · up to 15h' },
      { icon: <StorageIcon />, label: 'Storage', value: '512GB SSD · 8GB RAM' },
    ],
    colors: ['Gray'],
  },

  // ---------- ACCESSORIES ----------
  {
    id: 14,
    name: 'Galaxy Watch 6',
    category: 'accessories',
    price: 399000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-r940nzkamea/gallery/levant-galaxy-watch6-r940-sm-r940nzkamea-537397743?$650_519_PNG$',
    rating: 4.7,
    reviews: 932,
    badge: 'Hot',
    description: 'Advanced smartwatch with BioActive sensor and sleep coaching.',
    specs: [
      { icon: <CameraIcon />, label: 'Sensor', value: 'BioActive · ECG' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Exynos W930' },
      { icon: <BatteryIcon />, label: 'Battery', value: '425 mAh · up to 40h' },
      { icon: <StorageIcon />, label: 'Storage', value: '16GB · 2GB RAM' },
    ],
    colors: ['Graphite', 'Gold', 'Silver'],
  },
  {
    id: 15,
    name: 'Galaxy Buds Pro',
    category: 'accessories',
    price: 199000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-r190nzkaeub/gallery/levant-galaxy-buds-pro-r190-sm-r190nzkaeub-532457419?$650_519_PNG$',
    rating: 4.6,
    reviews: 1876,
    description: 'Intelligent ANC earbuds with 360° audio and crystal-clear calls.',
    specs: [
      { icon: <CameraIcon />, label: 'Drivers', value: '2-way · 11mm + 6.5mm' },
      { icon: <MemoryIcon />, label: 'Chip', value: 'BoraSoC' },
      { icon: <BatteryIcon />, label: 'Battery', value: '61 mAh buds · 472 mAh case' },
      { icon: <StorageIcon />, label: 'Audio', value: '360° Audio · ANC' },
    ],
    colors: ['Phantom Black', 'Phantom Silver', 'Phantom Violet'],
  },
  {
    id: 16,
    name: '45W Super Fast Charger',
    category: 'accessories',
    price: 45000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/ep-t4510xbegww/gallery/levant-45w-power-adapter-ep-t4510-ep-t4510xbegww-537398442?$650_519_PNG$',
    rating: 4.8,
    reviews: 3421,
    description: '45W USB-C fast charger compatible with Galaxy S24 and Tab S9.',
    specs: [
      { icon: <CameraIcon />, label: 'Power', value: '45W PD 3.0' },
      { icon: <MemoryIcon />, label: 'Port', value: 'USB-C' },
      { icon: <BatteryIcon />, label: 'Compatibility', value: 'Galaxy S/Tab/A Series' },
      { icon: <StorageIcon />, label: 'Cable', value: 'Not included' },
    ],
    colors: ['White', 'Black'],
  },
  {
    id: 17,
    name: 'Galaxy Watch 6 Classic',
    category: 'accessories',
    price: 550000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-r960nzkamea/gallery/levant-galaxy-watch6-classic-r960-sm-r960nzkamea-537397679?$650_519_PNG$',
    rating: 4.8,
    reviews: 512,
    description: 'Rotating bezel smartwatch with stainless steel body.',
    specs: [
      { icon: <CameraIcon />, label: 'Sensor', value: 'BioActive · ECG' },
      { icon: <MemoryIcon />, label: 'Processor', value: 'Exynos W930' },
      { icon: <BatteryIcon />, label: 'Battery', value: '425 mAh' },
      { icon: <StorageIcon />, label: 'Storage', value: '16GB · 2GB RAM' },
    ],
    colors: ['Black', 'Silver'],
  },
  {
    id: 18,
    name: 'S Pen Creator Edition',
    category: 'accessories',
    price: 85000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/levant/ej-pp950bbegww/gallery/levant-s-pen-creator-ej-pp950-ej-pp950bbegww-537406949?$650_519_PNG$',
    rating: 4.5,
    reviews: 218,
    description: 'Precision S Pen for Galaxy Tab and Galaxy Book.',
    specs: [
      { icon: <CameraIcon />, label: 'Pressure', value: '4096 levels' },
      { icon: <MemoryIcon />, label: 'Compatibility', value: 'Galaxy Tab S Series' },
      { icon: <BatteryIcon />, label: 'Power', value: 'No battery needed' },
      { icon: <StorageIcon />, label: 'Colors', value: 'Black, White' },
    ],
    colors: ['Black', 'White'],
  },
];

/* ============================================================
   CONSTANTS
   ============================================================ */
const ITEMS_PER_PAGE = 12;
const WHATSAPP_NUMBER = '250787878787';
const SHIPPING_FEE = 5000;
const FREE_SHIPPING_THRESHOLD = 50000;

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-RW').format(price) + ' RWF';

/* ============================================================
   VALIDATION
   ============================================================ */
const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string): boolean => /^\+?[\d\s-]{10,15}$/.test(phone);

const getCheckoutErrors = (form: CheckoutForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.fullname.trim()) errors.fullname = 'Full name is required';
  else if (form.fullname.trim().length < 3) errors.fullname = 'Name must be at least 3 characters';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(form.email)) errors.email = 'Invalid email format';
  if (!form.phone.trim()) errors.phone = 'Phone is required';
  else if (!validatePhone(form.phone)) errors.phone = 'Invalid phone number (10-15 digits)';
  if (!form.address.trim()) errors.address = 'Address is required';
  else if (form.address.trim().length < 5) errors.address = 'Address is too short';
  if (!form.city.trim()) errors.city = 'City is required';
  if (!form.paymentMethod.trim()) errors.paymentMethod = 'Please select a payment method';
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
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 ${showError ? 'text-red-500' : 'text-blue-600'}`}>
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
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
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
export const Market: React.FC = () => {
  /* ---------- Filters ---------- */
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------- Cart ---------- */
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('samsung_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  /* ---------- Modals ---------- */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- Checkout form ---------- */
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    fullname: '', email: '', phone: '', address: '', city: '', paymentMethod: '',
  });
  const [checkoutTouched, setCheckoutTouched] = useState<Record<string, boolean>>({});
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  const checkoutErrors = useMemo(() => getCheckoutErrors(checkoutForm), [checkoutForm]);
  const isCheckoutValid = Object.keys(checkoutErrors).length === 0;
  const checkoutShow = (f: string) => checkoutSubmitted || !!checkoutTouched[f];

  /* ---------- Persist cart ---------- */
  useEffect(() => {
    try {
      localStorage.setItem('samsung_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  /* ---------- Filtered + paginated products ---------- */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  /* ---------- Cart helpers ---------- */
  const addToCart = useCallback((product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }, [removeFromCart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : SHIPPING_FEE;
  const cartTotal = cartSubtotal + cartShipping;

  /* ---------- Modals handlers ---------- */
  const openDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  const openCheckout = () => {
    setCheckoutStatus(null);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSubmitted(true);
    setCheckoutTouched({ fullname: true, email: true, phone: true, address: true, city: true, paymentMethod: true });
    if (!isCheckoutValid) return;

    setLoading(true);
    setCheckoutStatus(null);

    try {
      // Simulated API call — replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCheckoutStatus('success');
      // Clear cart after success
      setTimeout(() => {
        setCart([]);
        setCheckoutOpen(false);
        setCheckoutForm({ fullname: '', email: '', phone: '', address: '', city: '', paymentMethod: '' });
        setCheckoutTouched({});
        setCheckoutSubmitted(false);
        setCheckoutStatus(null);
      }, 2000);
    } catch {
      setCheckoutStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const whatsappOrderLink = useMemo(() => {
    if (cart.length === 0) return '#';
    const lines = cart.map(
      (item) => `• ${item.product.name} × ${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`
    );
    const msg =
      `Hello Samsung Store, I want to order:\n\n${lines.join('\n')}\n\n` +
      `Subtotal: ${formatPrice(cartSubtotal)}\n` +
      `Shipping: ${cartShipping === 0 ? 'Free' : formatPrice(cartShipping)}\n` +
      `Total: ${formatPrice(cartTotal)}\n\n` +
      `Please confirm my order.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [cart, cartSubtotal, cartShipping, cartTotal]);

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <section className="relative overflow-hidden bg-black py-12 xs:py-16 md:py-20 lg:py-24">
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #1F6FEB20, transparent 70%)' }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] xs:w-[400px] lg:w-[500px] h-[300px] xs:h-[400px] lg:h-[500px] rounded-full"
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
          viewport={{ once: true }}
          className="text-center mb-6 xs:mb-8 lg:mb-10 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/50 mb-3">
            <StarIcon sx={{ fontSize: 14 }} />
            Samsung Market
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Shop All Products
          </h2>
          <p className="text-sm xs:text-base text-white/70 leading-relaxed">
            {PRODUCTS.length} genuine Samsung products — phones, tablets, computers, and accessories.
          </p>
        </motion.div>

        {/* ============================================================
            TOOLBAR — search + cart
            ============================================================ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 xs:gap-3 mb-4 xs:mb-5">
          <div className="relative flex-1">
            <SearchIcon
              sx={{ fontSize: 20 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 xs:py-3 rounded-xl bg-gray-950 border-2 border-blue-900/40 focus:border-blue-600 text-white placeholder-gray-500 outline-none transition-all text-sm xs:text-base"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center gap-2 px-4 xs:px-5 py-2.5 xs:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm xs:text-base shadow-lg shadow-blue-900/50 transition-all"
          >
            <CartIcon fontSize="small" />
            Cart
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] xs:text-xs font-extrabold w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* ============================================================
            CATEGORY TABS
            ============================================================ */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 xs:mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3 xs:px-4 py-2 xs:py-2.5 rounded-xl font-bold text-xs xs:text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-gray-950 text-white/70 border border-blue-900/40 hover:border-blue-600/60 hover:text-white'
              }`}
            >
              {cat.icon}
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* ============================================================
            PRODUCTS GRID
            ============================================================ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${currentPage}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5"
          >
            {paginatedProducts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <SearchIcon sx={{ fontSize: 64, color: '#1e293b' }} />
                <p className="text-white text-lg font-bold mt-3">No products found</p>
                <p className="text-white/60 text-sm">Try a different search or category.</p>
              </div>
            ) : (
              paginatedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-gray-950 border border-blue-900/40 hover:border-blue-600/60 rounded-2xl overflow-hidden transition-all flex flex-col"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] xs:text-[10px] font-bold uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}

                  {/* Image */}
                  <button
                    onClick={() => openDetails(product)}
                    className="relative w-full aspect-square bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-3 xs:p-4 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 w-full h-full object-contain max-h-[140px] xs:max-h-[180px]"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23111827"/><text x="100" y="110" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="14">No image</text></svg>';
                      }}
                    />
                  </button>

                  {/* Info */}
                  <div className="p-3 xs:p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <StarIcon sx={{ fontSize: 12, color: '#fbbf24' }} />
                      <span className="text-[10px] xs:text-xs text-white font-bold">
                        {product.rating}
                      </span>
                      <span className="text-[10px] xs:text-xs text-white/50">
                        ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-sm xs:text-base font-extrabold text-white leading-tight mb-1 line-clamp-2 min-h-[2.4em]">
                      {product.name}
                    </h3>

                    <p className="text-[10px] xs:text-xs text-white/60 line-clamp-2 mb-2 min-h-[2.4em]">
                      {product.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-sm xs:text-base font-extrabold text-blue-400">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[10px] xs:text-xs text-white/40 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => openDetails(product)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-blue-900/40 text-white font-semibold text-[11px] xs:text-xs transition-colors"
                        >
                          <InfoIcon sx={{ fontSize: 14 }} />
                          Info
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => addToCart(product)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] xs:text-xs shadow-lg shadow-blue-900/50 transition-colors"
                        >
                          <AddIcon sx={{ fontSize: 14 }} />
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ============================================================
            PAGINATION
            ============================================================ */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 xs:gap-3 mt-6 xs:mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 xs:w-10 xs:h-10 rounded-full bg-gray-950 border border-blue-900/40 hover:border-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              aria-label="Previous page"
            >
              <ArrowBackIcon fontSize="small" />
            </motion.button>

            <div className="flex items-center gap-1 xs:gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[32px] xs:min-w-[36px] h-9 xs:h-10 rounded-lg font-bold text-xs xs:text-sm transition-all ${
                    page === currentPage
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                      : 'bg-gray-950 border border-blue-900/40 text-white/70 hover:border-blue-600/60 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 xs:w-10 xs:h-10 rounded-full bg-gray-950 border border-blue-900/40 hover:border-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              aria-label="Next page"
            >
              <ArrowForwardIcon fontSize="small" />
            </motion.button>
          </motion.div>
        )}

        <p className="text-center text-[11px] xs:text-xs text-white/50 mt-3 xs:mt-4">
          Showing {paginatedProducts.length} of {filteredProducts.length} products · Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* ============================================================
          PRODUCT DETAILS MODAL (white bg, black text)
          ============================================================ */}
      <AnimatePresence>
        {detailsOpen && selectedProduct && (
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
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 60 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <button
                onClick={() => setDetailsOpen(false)}
                className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-20 text-black"
              >
                <CloseIcon fontSize="small" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 p-5 xs:p-6 sm:p-8">
                {/* LEFT: Image */}
                <div className="relative bg-gray-50 rounded-2xl p-4 xs:p-6 flex items-center justify-center min-h-[240px] xs:min-h-[280px] md:min-h-[340px]">
                  {selectedProduct.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] xs:text-xs font-bold">
                      {selectedProduct.badge}
                    </span>
                  )}
                  <motion.img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="relative z-10 w-full h-full object-contain max-h-[240px] xs:max-h-[280px] md:max-h-[320px]"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* RIGHT: Info */}
                <div className="flex flex-col">
                  <span className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl xs:text-2xl font-extrabold text-black mb-2">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{
                            fontSize: 16,
                            color: i < Math.floor(selectedProduct.rating) ? '#fbbf24' : '#e5e7eb',
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {selectedProduct.rating} · {selectedProduct.reviews} reviews
                    </span>
                  </div>

                  <p className="text-sm xs:text-base text-gray-700 leading-relaxed mb-4">
                    {selectedProduct.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {selectedProduct.specs.map((spec) => (
                      <div
                        key={spec.label}
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
                      </div>
                    ))}
                  </div>

                  {/* Colors + storage chips */}
                  <div className="mb-4">
                    <p className="text-[10px] xs:text-xs font-bold uppercase text-gray-500 mb-1.5">Colors</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.colors.map((c) => (
                        <span key={c} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-semibold text-black">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProduct.storage && (
                    <div className="mb-4">
                      <p className="text-[10px] xs:text-xs font-bold uppercase text-gray-500 mb-1.5">Storage</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.storage.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="mt-auto pt-3 border-t border-gray-200">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl xs:text-3xl font-extrabold text-blue-600">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(selectedProduct.oldPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          addToCart(selectedProduct);
                          setDetailsOpen(false);
                          setCartOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/40 transition-all"
                      >
                        <CartIcon fontSize="small" />
                        Add to Cart
                      </motion.button>
                      <motion.a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Samsung Store, I want to buy ${selectedProduct.name} (${formatPrice(selectedProduct.price)}).`)}`}
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          CART MODAL (white bg, black text)
          ============================================================ */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
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
                onClick={() => setCartOpen(false)}
                className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 text-black"
              >
                <CloseIcon fontSize="small" />
              </button>

              <div className="p-5 xs:p-6 sm:p-8">
                <div className="text-center mb-5">
                  <h2 className="text-xl xs:text-2xl font-extrabold text-blue-600">
                    Your Cart
                  </h2>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1">
                    {cart.length === 0
                      ? 'Your cart is empty'
                      : `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart`}
                  </p>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <CartIcon sx={{ fontSize: 64, color: '#e5e7eb' }} />
                    <p className="text-black font-bold mt-3">No items yet</p>
                    <p className="text-gray-500 text-sm mb-4">Browse products and add to cart.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="max-h-[40vh] overflow-y-auto mb-4 -mx-2 px-2">
                      {cart.map((item) => (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-2 xs:gap-3 py-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 p-1">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs xs:text-sm font-bold text-black truncate">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] xs:text-xs text-blue-600 font-bold">
                              {formatPrice(item.product.price)}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-black transition-colors"
                              >
                                <RemoveIcon sx={{ fontSize: 14 }} />
                              </button>
                              <span className="text-xs font-bold text-black min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-black transition-colors"
                              >
                                <AddIcon sx={{ fontSize: 14 }} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs xs:text-sm font-extrabold text-black">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                            >
                              <DeleteIcon sx={{ fontSize: 14 }} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="bg-gray-50 rounded-xl p-3 xs:p-4 mb-4">
                      <div className="flex justify-between text-xs xs:text-sm mb-1.5">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold text-black">{formatPrice(cartSubtotal)}</span>
                      </div>
                      <div className="flex justify-between text-xs xs:text-sm mb-1.5">
                        <span className="text-gray-600">Shipping</span>
                        <span className={`font-bold ${cartShipping === 0 ? 'text-green-600' : 'text-black'}`}>
                          {cartShipping === 0 ? 'Free' : formatPrice(cartShipping)}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-1.5 mt-1.5 flex justify-between text-sm xs:text-base">
                        <span className="font-bold text-black">Total</span>
                        <span className="font-extrabold text-blue-600">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>

                    {/* Checkout CTA */}
                    <div className="flex flex-col xs:flex-row gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={openCheckout}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/40 transition-all"
                      >
                        <PaymentIcon fontSize="small" />
                        Checkout
                      </motion.button>
                      <motion.a
                        href={whatsappOrderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all"
                      >
                        <WhatsAppIcon fontSize="small" />
                        WhatsApp Order
                      </motion.a>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          CHECKOUT MODAL (white bg, black text)
          ============================================================ */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 xs:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => !loading && setCheckoutOpen(false)}
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
              <button
                onClick={() => !loading && setCheckoutOpen(false)}
                className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10 text-black"
              >
                <CloseIcon fontSize="small" />
              </button>

              <div className="p-5 xs:p-6 sm:p-8">
                {/* Success/error banner */}
                {checkoutStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-4 rounded-xl p-3 flex items-center gap-2 font-semibold text-sm ${
                      checkoutStatus === 'success'
                        ? 'bg-blue-50 border border-blue-300 text-blue-700'
                        : 'bg-red-50 border border-red-300 text-red-700'
                    }`}
                  >
                    {checkoutStatus === 'success' ? (
                      <CheckCircleIcon fontSize="small" />
                    ) : (
                      <ErrorIcon fontSize="small" />
                    )}
                    {checkoutStatus === 'success'
                      ? 'Order placed successfully! We will call you to confirm.'
                      : 'Payment failed. Please try again.'}
                  </motion.div>
                )}

                <div className="text-center mb-5">
                  <h2 className="text-xl xs:text-2xl font-extrabold text-blue-600">Checkout</h2>
                  <p className="text-xs xs:text-sm text-gray-600 mt-1">
                    Total: <span className="font-bold text-black">{formatPrice(cartTotal)}</span>
                  </p>
                </div>

                <form onSubmit={handleCheckout} noValidate>
                  <Field
                    label="Full Name"
                    value={checkoutForm.fullname}
                    onChange={(v) => setCheckoutForm({ ...checkoutForm, fullname: v })}
                    onBlur={() => setCheckoutTouched((t) => ({ ...t, fullname: true }))}
                    error={checkoutErrors.fullname}
                    touched={checkoutShow('fullname')}
                    icon={<PersonIcon fontSize="small" />}
                    index={0}
                  />
                  <Field
                    label="Email"
                    value={checkoutForm.email}
                    onChange={(v) => setCheckoutForm({ ...checkoutForm, email: v })}
                    onBlur={() => setCheckoutTouched((t) => ({ ...t, email: true }))}
                    error={checkoutErrors.email}
                    touched={checkoutShow('email')}
                    type="email"
                    icon={<EmailIcon fontSize="small" />}
                    index={1}
                  />
                  <Field
                    label="Phone"
                    value={checkoutForm.phone}
                    onChange={(v) => setCheckoutForm({ ...checkoutForm, phone: v })}
                    onBlur={() => setCheckoutTouched((t) => ({ ...t, phone: true }))}
                    error={checkoutErrors.phone}
                    touched={checkoutShow('phone')}
                    type="tel"
                    icon={<PhoneCallIcon fontSize="small" />}
                    index={2}
                  />
                  <Field
                    label="Delivery Address"
                    value={checkoutForm.address}
                    onChange={(v) => setCheckoutForm({ ...checkoutForm, address: v })}
                    onBlur={() => setCheckoutTouched((t) => ({ ...t, address: true }))}
                    error={checkoutErrors.address}
                    touched={checkoutShow('address')}
                    icon={<LocationIcon fontSize="small" />}
                    index={3}
                  />
                  <Field
                    label="City"
                    value={checkoutForm.city}
                    onChange={(v) => setCheckoutForm({ ...checkoutForm, city: v })}
                    onBlur={() => setCheckoutTouched((t) => ({ ...t, city: true }))}
                    error={checkoutErrors.city}
                    touched={checkoutShow('city')}
                    icon={<LocationIcon fontSize="small" />}
                    index={4}
                  />
                  <Field
                    label="Payment Method"
                    value={checkoutForm.paymentMethod}
                    onChange={(v) => setCheckoutForm({ ...checkoutForm, paymentMethod: v })}
                    onBlur={() => setCheckoutTouched((t) => ({ ...t, paymentMethod: true }))}
                    error={checkoutErrors.paymentMethod}
                    touched={checkoutShow('paymentMethod')}
                    index={5}
                    select
                    options={[
                      { value: 'MTN Mobile Money', label: 'MTN Mobile Money' },
                      { value: 'Airtel Money', label: 'Airtel Money' },
                      { value: 'Bank Transfer', label: 'Bank Transfer' },
                      { value: 'Cash on Delivery', label: 'Cash on Delivery' },
                      { value: 'Card', label: 'Credit / Debit Card' },
                    ]}
                  />

                  {/* Submit — disabled until valid */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={isCheckoutValid && !loading ? { scale: 1.02 } : {}}
                    whileTap={isCheckoutValid && !loading ? { scale: 0.98 } : {}}
                    className="mt-2"
                  >
                    <button
                      type="submit"
                      disabled={!isCheckoutValid || loading || cart.length === 0}
                      className={`w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-500 ${
                        isCheckoutValid
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40'
                          : 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/40 opacity-90 cursor-not-allowed'
                      } ${loading ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {loading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : isCheckoutValid ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircleIcon />
                          Place Order
                        </motion.span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ErrorIcon />
                          {checkoutSubmitted ? 'Fix errors to continue' : 'Complete all fields'}
                        </span>
                      )}
                    </button>
                  </motion.div>

                  <p className="text-center text-[10px] xs:text-xs text-gray-500 mt-3">
                    By placing your order, you agree to our terms & privacy policy.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

