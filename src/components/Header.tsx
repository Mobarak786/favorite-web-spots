
import React from 'react';
import { Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={24} className="text-spot-primary" />
            <span className="text-xl font-semibold text-gray-800">Web Spots</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-spot-primary transition-colors">Home</a>
            <a href="#favorites" className="text-gray-600 hover:text-spot-primary transition-colors">Favorites</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
