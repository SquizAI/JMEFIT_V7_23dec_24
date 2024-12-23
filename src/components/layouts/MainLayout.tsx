import React from 'react';
import NavBar from '../navigation/NavBar';
import Footer from '../Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50">
          <NavBar />
        </header>
        <main className={`flex-1 pt-16 ${className}`}>
          {children}
        </main>
        <Footer />
    </div>
  );
};

export default MainLayout;