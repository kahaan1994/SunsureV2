import React from 'react';
import { Settings, Menu } from 'lucide-react';

interface NavbarProps {
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleAdmin, isAdminOpen }) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[64px] md:h-[72px] z-[100] px-6 flex items-center justify-between transition-all duration-300 bg-[#2A4838] border-b border-white/10">
      <div className="flex items-center">
        <img 
          src="https://sunsure-energy.com/wp-content/uploads/2024/08/Sunsure_Master_Logo-with-Tagline_Horizontal_AW_RGB-04-1.svg" 
          alt="Sunsure Energy" 
          className="h-8 md:h-10 w-auto object-contain brightness-0 invert" 
        />
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide">Solutions</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide">Projects</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide">About Us</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide">Career</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide">Knowledge Hub</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="hidden sm:flex items-center justify-center px-5 py-2 rounded-full bg-white text-[#2A4838] hover:bg-gray-100 text-sm font-semibold transition-colors shadow-md">
          Contact Us
        </a>
        <button
          onClick={onToggleAdmin}
          className={`hidden items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${isAdminOpen
              ? 'bg-white text-zinc-900 hover:bg-zinc-100'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
        >
          <Settings className={`w-4 h-4 ${isAdminOpen ? 'rotate-90' : ''} transition-transform duration-300`} />
          <span className="hidden sm:inline">{isAdminOpen ? 'Close Admin' : 'Admin Panel'}</span>
        </button>
        <button className="md:hidden text-white p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};
