
import React from 'react';
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from 'react-router-dom';
import { Globe, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    // After signing out, redirect to the landing page
    navigate('/');
  };

  return (
    <header className="fixed w-full top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-spot-primary" />
          <span className="font-semibold text-xl">Web Spot</span>
        </NavLink>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSignOut} 
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
