import React from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-12 font-light text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="mb-6">
               <img 
                 src="https://i.ibb.co/h1Lb7q89/mast-Dzynlogo-jpg.jpg" 
                 alt="MastDzyn Logo" 
                 className="h-16 w-auto object-contain"
                 onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/240x60?text=MastDzyn';
                 }}
               />
            </div>
            <p className="text-gray-500 text-base leading-relaxed">
              Redefining the digital landscape through bold strategy and impeccable design. We build brands that lead.
            </p>
          </div>
          
          <div>
            <h3 className="text-black font-medium text-lg mb-6">Agency</h3>
            <ul className="space-y-4 text-base text-gray-500">
              <li className="hover:text-primary cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Press</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-black font-medium text-lg mb-6">Social</h3>
            <ul className="space-y-4 text-base text-gray-500">
              <li className="flex items-center hover:text-primary cursor-pointer transition-colors">
                <Instagram className="h-5 w-5 mr-3" /> Instagram
              </li>
              <li className="flex items-center hover:text-primary cursor-pointer transition-colors">
                <Twitter className="h-5 w-5 mr-3" /> Twitter
              </li>
              <li className="flex items-center hover:text-primary cursor-pointer transition-colors">
                <Linkedin className="h-5 w-5 mr-3" /> LinkedIn
              </li>
              <li className="flex items-center hover:text-primary cursor-pointer transition-colors">
                <Github className="h-5 w-5 mr-3" /> GitHub
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-black font-medium text-lg mb-6">Get in Touch</h3>
            <p className="text-gray-500 text-base mb-3">hello@mastdzyn.com</p>
            <p className="text-gray-500 text-base mb-3">+1 (888) CRE-8IVE</p>
            <p className="text-gray-500 text-base">
              Design District<br />
              New York, NY 10012
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MastDzyn.com. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0 text-gray-500 text-sm">
            <span className="hover:text-black cursor-pointer">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;