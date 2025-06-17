// src/components/Header.tsx
import React, { useContext, useState } from 'react';
import { ShoppingCart, Menu, X, Cloud, Globe } from 'lucide-react';
import { useCartContext } from '../context/CartContext';
import { LanguageContext } from '../context/LanguageContext';
import LanguagePopup from './LanguagePopup';
import WeatherModal from './WeatherModal';

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const { getTotalItems, setIsCartOpen } = useCartContext();
  const { t } = useContext(LanguageContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('header.home') },
    { id: 'services', label: t('header.services') },
    { id: 'news', label: t('header.news') },
    { id: 'contact', label: t('header.contact') },
    { id: 'terms', label: t('header.terms') },
  ];

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <img
                src="/image.png"
                alt="Agrow Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <div className="hidden">
                <div className="bg-primary p-2 rounded-lg">
                  <div className="h-6 w-6 text-white font-bold flex items-center justify-center">A</div>
                </div>
                <span className="text-2xl font-bold text-primary">Agrow</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium transition-colors duration-200 ${
                    currentSection === item.id
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-text hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Weather, Language, Cart, and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Weather Button */}
              <button
                onClick={() => setIsWeatherOpen(true)}
                className="relative p-2 text-text hover:text-secondary transition-colors duration-200"
                title={t('header.weather')}
              >
                <Cloud className="h-6 w-6" />
              </button>

              {/* Language Button */}
              <button
                onClick={() => setIsLanguagePopupOpen(true)}
                className="flex items-center p-2 text-text hover:text-primary transition-colors duration-200"
                title="Select Language"
              >
                <Globe className="h-6 w-6" />
              </button>

              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-text hover:text-primary transition-colors duration-200"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-text"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-4 rounded-lg transition-colors duration-200 ${
                      currentSection === item.id
                        ? 'bg-accent/20 text-primary font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Weather Modal */}
      {isWeatherOpen && (
        <WeatherModal onClose={() => setIsWeatherOpen(false)} />
      )}

      {/* Language Popup */}
      {isLanguagePopupOpen && (
        <LanguagePopup onClose={() => setIsLanguagePopupOpen(false)} />
      )}
    </>
  );
};

export default Header;