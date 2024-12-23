import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Instagram, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import NavItem from './navigation/NavItem';
import MobileNav from './navigation/MobileNav';
import { mainNavItems } from './navigation/navItems';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo className="w-24 h-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <div key={item.label}>
                <NavItem item={item} currentPath={location.pathname} />
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <motion.a
              href="https://www.instagram.com/jmefit_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Instagram className="w-5 h-5" />
              <span>@jmefit_</span>
            </motion.a>

            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
              >
                <User className="w-5 h-5" />
                <span>{user.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-zinc-800 rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={isOpen}
        items={mainNavItems}
        user={user}
        currentPath={location.pathname}
      />
    </nav>
  );
};

export default Navbar;