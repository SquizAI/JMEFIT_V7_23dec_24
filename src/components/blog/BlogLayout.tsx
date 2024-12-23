import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import BlogSidebar from './BlogSidebar';

interface BlogLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`${showSidebar ? 'lg:w-3/4' : 'w-full'}`}>
            {children}
          </div>
          {showSidebar && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/4"
            >
              <BlogSidebar />
            </motion.aside>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogLayout;