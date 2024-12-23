import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, User } from 'lucide-react';
import { NavItem } from './types';
import { User as UserType } from '../../types/auth';

interface MobileNavProps {
  isOpen: boolean;
  items: NavItem[];
  user: UserType | null;
  currentPath: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, items, user, currentPath }) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
      className="md:hidden overflow-hidden bg-black"
    >
      <div className="container mx-auto px-4 py-4 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="border-b border-zinc-800 pb-4">
            {item.children ? (
              <>
                <div className="font-semibold mb-2">{item.label}</div>
                <div className="space-y-2 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block text-gray-400 hover:text-[#3dd8e8] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.path!}
                className={`block ${
                  currentPath === item.path
                    ? 'text-[#3dd8e8]'
                    : 'text-gray-400 hover:text-[#3dd8e8]'
                } transition-colors`}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}

        <div className="pt-4 space-y-4">
          <a
            href="https://www.instagram.com/jmefit_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-500"
          >
            <Instagram className="w-5 h-5" />
            <span>@jmefit_</span>
          </a>

          {user ? (
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="flex items-center gap-2 text-[#3dd8e8]"
            >
              <User className="w-5 h-5" />
              <span>{user.role === 'admin' ? 'Admin' : 'Dashboard'}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-[#3dd8e8]"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNav;