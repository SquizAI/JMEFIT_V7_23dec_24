import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = ({ item, currentPath }) => {
  if (item.children) {
    return (
      <div className="relative group">
        {item.path ? (
          <Link 
            to={item.path}
            className="flex items-center gap-1 py-2 hover:text-[#3dd8e8] transition-colors"
          >
            {item.label}
            <ChevronDown className="w-4 h-4" />
          </Link>
        ) : (
          <button className="flex items-center gap-1 py-2 hover:text-[#3dd8e8] transition-colors">
            {item.label}
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
        <div className="absolute left-0 top-full w-48 py-2 bg-zinc-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {item.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              className="block px-4 py-2 hover:bg-zinc-800 hover:text-[#3dd8e8] transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path!}
      className={`py-2 transition-colors ${
        currentPath === item.path
          ? 'text-[#3dd8e8]'
          : 'hover:text-[#3dd8e8]'
      }`}
    >
      {item.label}
    </Link>
  );
};

export default NavItem;