import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <div 
            className="flex items-center cursor-pointer group py-2" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="https://i.ibb.co/h1Lb7q89/mast-Dzynlogo-jpg.jpg" 
              alt="MastDzyn Logo" 
              className="h-14 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300x80?text=MastDzyn';
              }}
            />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-md text-base font-normal transition-colors duration-200 relative group hover:text-black ${
                    currentPage === item.id
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-primary text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-primary/40"
              >
                Start a Project
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-lg font-light ${
                  currentPage === item.id
                    ? 'text-primary bg-gray-50'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             <button
                onClick={() => handleNavClick('contact')}
                className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium text-primary hover:bg-gray-50"
              >
                Start a Project
              </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;