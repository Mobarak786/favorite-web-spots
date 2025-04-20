
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">© {new Date().getFullYear()} Web Spots. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-gray-600 hover:text-spot-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-gray-600 hover:text-spot-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
