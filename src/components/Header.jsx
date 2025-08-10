import {
  Search,
  ShoppingCart,
  UserRoundPen,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearProfile } from "../redux/profileSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


const Header = () => {
  const { cartCount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    setDropdownOpen(false);
    navigate("/");
    toast.success("Signed out successfully!");
  };

  const handleCategoryClick = () => {
    setMenuOpen(false);
    navigate("/", { state: { scrollToCategory: true } });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 border-b border-stone-300 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-white/30 shadow-lg" : "bg-stone-50"}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Mobile Left */}
        <div className="flex items-center md:hidden gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <div className="text-xl font-bold text-stone-700">TechKart</div>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:block text-2xl font-bold text-stone-700">TechKart</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-medium text-stone-800">
          <Link to="/" className="hover:text-stone-600">Home</Link>
          <Link to="/about" className="hover:text-stone-600">About</Link>
          <button onClick={handleCategoryClick} className="hover:text-stone-600 cursor-pointer">Category</button>
        </div>

        {/* Right Icons */}
        <div className="relative hidden md:flex items-center gap-4">
          <Link to="/search"><Search size={20} /></Link>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <UserRoundPen size={20} className="cursor-pointer" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl p-2 text-sm z-50"
                >
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block py-2 px-4 hover:bg-stone-100 rounded">
                    Profile
                  </Link>
                  {user ? (
                    <button onClick={handleLogout} className="w-full text-left py-2 px-4 hover:bg-stone-100 rounded">
                      Sign Out
                    </button>
                  ) : (
                    <Link to="/login" onClick={() => setDropdownOpen(false)} className="block py-2 px-4 hover:bg-stone-100 rounded">
                      Sign In
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-stone-800 text-white text-xs h-4 w-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/search"><Search size={22} /></Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-stone-800 text-white text-xs h-4 w-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-zinc-100 to-stone-50 px-6 py-4 border-t border-stone-300 shadow-sm"
          >
            <div className="flex flex-col gap-4 text-stone-800 font-medium">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              <button onClick={handleCategoryClick} className="text-start">Category</button>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>

              {user ? (
                <button onClick={handleLogout} className="text-start">Sign Out</button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
