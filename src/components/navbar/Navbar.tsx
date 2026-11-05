// Navbar.tsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ContactMail as ContactMailIcon,
  Visibility,
  VisibilityOff,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  Storefront as StorefrontIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";

/* ============================================================
   TYPES
   ============================================================ */
interface User {
  id: string;
  fullname: string;
  email: string;
  role: "user" | "admin" | "manager";
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface NavRoute {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ============================================================
   WHATSAPP
   ============================================================ */
const WHATSAPP_NUMBER = "250787878787";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Samsung Store, I have a question.",
)}`;

/* ============================================================
   NAV ROUTES
   ============================================================ */
const NAV_ROUTES: NavRoute[] = [
  { label: "Home", href: "/", icon: <StorefrontIcon fontSize="small" /> },
  { label: "About", href: "/about", icon: <InfoIcon fontSize="small" /> },
  {
    label: "Services",
    href: "/services",
    icon: <BuildIcon fontSize="small" />,
  },
  {
    label: "Market",
    href: "/market",
    icon: <StorefrontIcon fontSize="small" />,
  },
];

/* ============================================================
   SAMSUNG SVG LOGO (white + blue on black)
   ============================================================ */
const SamsungLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.svg
    viewBox="0 0 200 40"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <defs>
      <linearGradient id="samsungGrad" x1="0" y1="0" x2="200" y2="40">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1F6FEB" />
      </linearGradient>
    </defs>
    <ellipse
      cx="100"
      cy="20"
      rx="95"
      ry="16"
      fill="url(#samsungGrad)"
      opacity="0.15"
    />
    <motion.text
      x="100"
      y="27"
      textAnchor="middle"
      fontSize="22"
      fontWeight="900"
      letterSpacing="1"
      fill="url(#samsungGrad)"
      fontFamily="Arial, Helvetica, sans-serif"
      initial={{ letterSpacing: "5px", opacity: 0 }}
      animate={{ letterSpacing: "1px", opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      SAMSUNG
    </motion.text>
    <motion.circle
      cx="100"
      cy="20"
      r="18"
      fill="none"
      stroke="url(#samsungGrad)"
      strokeWidth="1.5"
      strokeDasharray="6 4"
      initial={{ pathLength: 0, rotate: 0 }}
      animate={{ pathLength: 1, rotate: 360 }}
      transition={{
        pathLength: { duration: 2, repeat: Infinity, repeatType: "reverse" },
        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
      }}
    />
  </motion.svg>
);

/* ============================================================
   FLOATING SHAPES (blue-only)
   ============================================================ */
const FloatingShapes: React.FC = () => {
  const colors = ["#1F6FEB", "#3b82f6", "#60a5fa", "#1428A0"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 30 + i * 12,
            height: 30 + i * 12,
            background: `radial-gradient(circle, ${colors[i % colors.length]}40, transparent 70%)`,
            left: `${5 + i * 13}%`,
            top: `${(i * 17) % 90}%`,
          }}
          animate={{
            y: [0, -25, 0, 25, 0],
            x: [0, 15, 0, -15, 0],
            scale: [1, 1.2, 1, 0.9, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   VALIDATION
   ============================================================ */
const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string): boolean =>
  /^\+?[\d\s-]{10,15}$/.test(phone);

const getLoginErrors = (form: LoginForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email format";
  if (!form.password.trim()) errors.password = "Password is required";
  else if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  return errors;
};

const getRegisterErrors = (form: RegisterForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.fullname.trim()) errors.fullname = "Full name is required";
  else if (form.fullname.trim().length < 3)
    errors.fullname = "Name must be at least 3 characters";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email format";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!validatePhone(form.phone))
    errors.phone = "Invalid phone number (10-15 digits)";
  if (!form.password.trim()) errors.password = "Password is required";
  else if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  if (!form.confirmPassword.trim())
    errors.confirmPassword = "Confirm password is required";
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};

const getContactErrors = (form: ContactForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 3)
    errors.name = "Name must be at least 3 characters";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email format";
  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
};

/* ============================================================
   FIELD COMPONENT (white modal → black text)
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
  endAdornment?: React.ReactNode;
  index?: number;
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
  endAdornment,
  index = 0,
}) => {
  const showError = !!touched && !!error;
  const showValid = !!touched && !error && value.trim() !== "";

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
        {icon && (
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
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full ${icon ? "pl-11" : "pl-4"} ${
            endAdornment ? "pr-11" : "pr-10"
          } py-3 rounded-xl border-2 bg-white text-black outline-none transition-all duration-300 placeholder-gray-400 ${
            showError
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              : showValid
                ? "border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
                : "border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        {!endAdornment && touched && (
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
        {endAdornment && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {endAdornment}
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
   SUBMIT BUTTON — red when invalid, blue when valid
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
          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40 hover:shadow-xl"
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
   MODAL WRAPPER — WHITE bg, BLACK text (with blue accents)
   ============================================================ */
interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  children,
  title,
  subtitle,
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
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 60, rotateX: -15 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
          <FloatingShapes />
          <div className="relative p-5 xs:p-6 sm:p-8 z-10">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 xs:top-4 xs:right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:rotate-90 text-black"
            >
              <CloseIcon fontSize="small" />
            </button>
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
   MAIN NAVBAR — BLACK bg, WHITE text, BLUE headings
   ============================================================ */
export const Navbar: React.FC = () => {
  /* ---------- Auth ---------- */
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- Modals ---------- */
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardDropdown, setDashboardDropdown] = useState(false);

  /* ---------- Forms ---------- */
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  /* ---------- Touched maps ---------- */
  const [loginTouched, setLoginTouched] = useState<Record<string, boolean>>({});
  const [registerTouched, setRegisterTouched] = useState<
    Record<string, boolean>
  >({});
  const [contactTouched, setContactTouched] = useState<Record<string, boolean>>(
    {},
  );

  /* ---------- Submitted flags ---------- */
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  /* ---------- Password visibility ---------- */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ---------- Snackbar ---------- */
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });

  /* ---------- Derived errors ---------- */
  const loginErrors = useMemo(() => getLoginErrors(loginForm), [loginForm]);
  const registerErrors = useMemo(
    () => getRegisterErrors(registerForm),
    [registerForm],
  );
  const contactErrors = useMemo(
    () => getContactErrors(contactForm),
    [contactForm],
  );

  const isLoginValid = Object.keys(loginErrors).length === 0;
  const isRegisterValid = Object.keys(registerErrors).length === 0;
  const isContactValid = Object.keys(contactErrors).length === 0;

  /* ---------- Auth check on mount ---------- */
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch {
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();
  }, []);

  /* ---------- Snackbar auto-close ---------- */
  useEffect(() => {
    if (snackbar.open) {
      const t = setTimeout(
        () => setSnackbar((s) => ({ ...s, open: false })),
        3500,
      );
      return () => clearTimeout(t);
    }
  }, [snackbar]);

  /* ---------- Close dropdown on outside click ---------- */
  useEffect(() => {
    const close = () => setDashboardDropdown(false);
    if (dashboardDropdown) {
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }
  }, [dashboardDropdown]);

  /* ---------- Show helpers ---------- */
  const loginShow = (field: string) => loginSubmitted || !!loginTouched[field];
  const registerShow = (field: string) =>
    registerSubmitted || !!registerTouched[field];
  const contactShow = (field: string) =>
    contactSubmitted || !!contactTouched[field];

  /* ---------- Submit handlers ---------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSubmitted(true);
    setLoginTouched({ email: true, password: true });
    if (!isLoginValid) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", loginForm);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setSnackbar({
        open: true,
        message: "Login successful! Welcome back 🎉",
        severity: "success",
      });
      setLoginOpen(false);
      setLoginForm({ email: "", password: "" });
      setLoginTouched({});
      setLoginSubmitted(false);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSubmitted(true);
    setRegisterTouched({
      fullname: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    if (!isRegisterValid) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", registerForm);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setSnackbar({
        open: true,
        message: "Registration successful! Welcome aboard 🚀",
        severity: "success",
      });
      setRegisterOpen(false);
      setRegisterForm({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setRegisterTouched({});
      setRegisterSubmitted(false);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setContactTouched({ name: true, email: true, message: true });
    if (!isContactValid) return;
    setLoading(true);
    try {
      await axios.post("/api/contact", contactForm);
      setSnackbar({
        open: true,
        message: "Message sent successfully! We will reply soon 📬",
        severity: "success",
      });
      setContactOpen(false);
      setContactForm({ name: "", email: "", message: "" });
      setContactTouched({});
      setContactSubmitted(false);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to send message.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch {
      /* ignore */
    }
    localStorage.removeItem("token");
    setUser(null);
    setDashboardDropdown(false);
    setSnackbar({
      open: true,
      message: "Logged out successfully! See you soon 👋",
      severity: "success",
    });
  };

  const navigateToDashboard = () => {
    if (!user) return;
    switch (user.role) {
      case "admin":
        window.location.href = "/dashboard/admin";
        break;
      case "manager":
        window.location.href = "/dashboard/manager";
        break;
      default:
        window.location.href = "/dashboard";
    }
  };

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <>
      {/* ==================== NAVBAR (BLACK bg) ==================== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="sticky top-0 z-40 bg-black border-b border-blue-900/40 shadow-lg"
      >
        <div className="max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 xs:h-16 lg:h-[72px] gap-2 lg:gap-4">
            {/* ==================== LEFT: LOGO ==================== */}
            <motion.a
              href="/"
              className="flex items-center gap-2 shrink-0 select-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <SamsungLogo className="h-7 xs:h-8 sm:h-9 lg:h-10 w-auto" />
            </motion.a>

            {/* ==================== CENTER: NAV ROUTES (desktop) ==================== */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
              {NAV_ROUTES.map((route) => (
                <motion.a
                  key={route.href}
                  href={route.href}
                  className="flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-lg text-white hover:text-blue-400 hover:bg-blue-950/50 font-semibold text-sm xl:text-base transition-colors whitespace-nowrap"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {route.label}
                </motion.a>
              ))}
            </div>

            {/* ==================== RIGHT: AUTH + USER ==================== */}
            <div className="flex items-center gap-1 xs:gap-2 shrink-0">
              {!user ? (
                <>
                  {/* WhatsApp quick action */}
                  <motion.a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-blue-950/50 font-semibold text-sm transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon fontSize="small" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setContactOpen(true)}
                    className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-blue-950/50 font-semibold text-sm transition-colors"
                  >
                    <ContactMailIcon fontSize="small" />
                    Contact
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLoginOpen(true)}
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-white hover:text-blue-400 hover:bg-blue-950/50 font-semibold text-sm transition-colors"
                  >
                    <LoginIcon fontSize="small" />
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(31,111,235,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRegisterOpen(true)}
                    className="hidden md:flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-full text-white font-semibold text-xs xl:text-sm bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/50 transition-all"
                  >
                    <PersonAddIcon fontSize="small" />
                    Register
                  </motion.button>
                </>
              ) : (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDashboardDropdown((v) => !v);
                    }}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-blue-950/50 transition-colors"
                  >
                    <div
                      className="w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #1428A0, #1F6FEB)",
                      }}
                    >
                      {user.fullname.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-xs text-white/60 leading-tight">
                        Hello,
                      </p>
                      <p className="text-sm font-bold text-white leading-tight max-w-[100px] truncate">
                        {user.fullname}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: dashboardDropdown ? 180 : 0 }}
                      className="hidden lg:block text-white/60"
                    >
                      <KeyboardArrowDownIcon fontSize="small" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {dashboardDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-bold text-black truncate">
                            {user.fullname}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {user.role}
                          </span>
                        </div>
                        <button
                          onClick={navigateToDashboard}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-black hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                        >
                          <DashboardIcon
                            fontSize="small"
                            sx={{ color: "#2563eb" }}
                          />
                          Dashboard
                        </button>
                        <div className="h-px bg-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <LogoutIcon fontSize="small" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile menu toggle */}
              <motion.button
                className="lg:hidden w-9 h-9 xs:w-10 xs:h-10 rounded-xl flex items-center justify-center text-white hover:bg-blue-950/50 transition-colors"
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ==================== MOBILE MENU ==================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-black border-t border-blue-900/40"
            >
              <div className="px-3 xs:px-4 py-3 xs:py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {NAV_ROUTES.map((route) => (
                  <a
                    key={route.href}
                    href={route.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 xs:py-3 rounded-xl text-white hover:bg-blue-950/50 font-semibold text-sm xs:text-base transition-colors"
                  >
                    <span className="text-blue-400">{route.icon}</span>
                    {route.label}
                  </a>
                ))}
                <div className="h-px bg-blue-900/40 my-2" />

                {/* WhatsApp quick link */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-white hover:bg-blue-950/50 font-semibold text-sm xs:text-base transition-colors"
                >
                  <WhatsAppIcon fontSize="small" sx={{ color: "#3b82f6" }} />
                  WhatsApp
                </a>
                <button
                  onClick={() => {
                    setContactOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-white hover:bg-blue-950/50 font-semibold text-sm xs:text-base transition-colors"
                >
                  <ContactMailIcon fontSize="small" sx={{ color: "#3b82f6" }} />
                  Contact Form
                </button>

                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        setLoginOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-white hover:bg-blue-950/50 font-semibold text-sm xs:text-base transition-colors"
                    >
                      <LoginIcon fontSize="small" sx={{ color: "#3b82f6" }} />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setRegisterOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 justify-center px-4 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 text-sm xs:text-base shadow-lg shadow-blue-900/50 transition-colors"
                    >
                      <PersonAddIcon fontSize="small" />
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigateToDashboard();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-white hover:bg-blue-950/50 font-semibold text-sm xs:text-base transition-colors"
                    >
                      <DashboardIcon
                        fontSize="small"
                        sx={{ color: "#3b82f6" }}
                      />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-950/40 font-semibold text-sm xs:text-base transition-colors"
                    >
                      <LogoutIcon fontSize="small" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ==================== LOGIN MODAL ==================== */}
      <ModalWrapper
        open={loginOpen}
        onClose={() => !loading && setLoginOpen(false)}
        title="Welcome Back"
        subtitle="Sign in to your Samsung account"
      >
        <form onSubmit={handleLogin} noValidate>
          <Field
            label="Email"
            value={loginForm.email}
            onChange={(v) => setLoginForm({ ...loginForm, email: v })}
            onBlur={() => setLoginTouched((t) => ({ ...t, email: true }))}
            error={loginErrors.email}
            touched={loginShow("email")}
            type="email"
            icon={<EmailIcon fontSize="small" />}
            index={0}
          />
          <Field
            label="Password"
            value={loginForm.password}
            onChange={(v) => setLoginForm({ ...loginForm, password: v })}
            onBlur={() => setLoginTouched((t) => ({ ...t, password: true }))}
            error={loginErrors.password}
            touched={loginShow("password")}
            type={showPassword ? "text" : "password"}
            icon={<LockIcon fontSize="small" />}
            index={1}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="p-2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            }
          />
          <SubmitButton
            isValid={isLoginValid}
            loading={loading}
            label="Sign In"
            touched={loginSubmitted}
          />
          <p className="text-center text-xs xs:text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      </ModalWrapper>

      {/* ==================== REGISTER MODAL ==================== */}
      <ModalWrapper
        open={registerOpen}
        onClose={() => !loading && setRegisterOpen(false)}
        title="Create Account"
        subtitle="Join the Samsung family"
      >
        <form onSubmit={handleRegister} noValidate>
          <Field
            label="Full Name"
            value={registerForm.fullname}
            onChange={(v) => setRegisterForm({ ...registerForm, fullname: v })}
            onBlur={() => setRegisterTouched((t) => ({ ...t, fullname: true }))}
            error={registerErrors.fullname}
            touched={registerShow("fullname")}
            icon={<BadgeIcon fontSize="small" />}
            index={0}
          />
          <Field
            label="Email"
            value={registerForm.email}
            onChange={(v) => setRegisterForm({ ...registerForm, email: v })}
            onBlur={() => setRegisterTouched((t) => ({ ...t, email: true }))}
            error={registerErrors.email}
            touched={registerShow("email")}
            type="email"
            icon={<EmailIcon fontSize="small" />}
            index={1}
          />
          <Field
            label="Phone"
            value={registerForm.phone}
            onChange={(v) => setRegisterForm({ ...registerForm, phone: v })}
            onBlur={() => setRegisterTouched((t) => ({ ...t, phone: true }))}
            error={registerErrors.phone}
            touched={registerShow("phone")}
            type="tel"
            icon={<PhoneIcon fontSize="small" />}
            index={2}
          />
          <Field
            label="Password"
            value={registerForm.password}
            onChange={(v) => setRegisterForm({ ...registerForm, password: v })}
            onBlur={() => setRegisterTouched((t) => ({ ...t, password: true }))}
            error={registerErrors.password}
            touched={registerShow("password")}
            type={showPassword ? "text" : "password"}
            icon={<LockIcon fontSize="small" />}
            index={3}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="p-2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            }
          />
          <Field
            label="Confirm Password"
            value={registerForm.confirmPassword}
            onChange={(v) =>
              setRegisterForm({ ...registerForm, confirmPassword: v })
            }
            onBlur={() =>
              setRegisterTouched((t) => ({ ...t, confirmPassword: true }))
            }
            error={registerErrors.confirmPassword}
            touched={registerShow("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            icon={<LockIcon fontSize="small" />}
            index={4}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="p-2 text-gray-500 hover:text-blue-600"
              >
                {showConfirmPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            }
          />
          <SubmitButton
            isValid={isRegisterValid}
            loading={loading}
            label="Create Account"
            touched={registerSubmitted}
          />
          <p className="text-center text-xs xs:text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setRegisterOpen(false);
                setLoginOpen(true);
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </ModalWrapper>

      {/* ==================== CONTACT MODAL ==================== */}
      <ModalWrapper
        open={contactOpen}
        onClose={() => !loading && setContactOpen(false)}
        title="Contact Us"
        subtitle="We'd love to hear from you"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="w-full mb-4"
          >
            <label className="block text-sm font-semibold text-black mb-1.5">
              Message
            </label>
            <textarea
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              onBlur={() => setContactTouched((t) => ({ ...t, message: true }))}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-black outline-none transition-all duration-300 resize-none placeholder-gray-400 ${
                contactShow("message") && contactErrors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                  : contactShow("message") &&
                      !contactErrors.message &&
                      contactForm.message.trim()
                    ? "border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
                    : "border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
              }`}
              placeholder="Write your message..."
            />
            <AnimatePresence>
              {contactShow("message") && contactErrors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium"
                >
                  <ErrorIcon sx={{ fontSize: 14 }} />
                  {contactErrors.message}
                </motion.p>
              )}
              {contactShow("message") &&
                !contactErrors.message &&
                contactForm.message.trim() && (
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
          <SubmitButton
            isValid={isContactValid}
            loading={loading}
            label="Send Message"
            touched={contactSubmitted}
          />
        </form>
      </ModalWrapper>

      {/* ==================== SNACKBAR (blue success / red error) ==================== */}
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
              className={`flex items-center gap-3 px-4 xs:px-5 py-3 xs:py-4 rounded-2xl shadow-2xl text-white font-semibold border ${
                snackbar.severity === "success"
                  ? "bg-blue-600 border-blue-500"
                  : snackbar.severity === "error"
                    ? "bg-red-600 border-red-500"
                    : snackbar.severity === "warning"
                      ? "bg-amber-600 border-amber-500"
                      : "bg-blue-700 border-blue-600"
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
