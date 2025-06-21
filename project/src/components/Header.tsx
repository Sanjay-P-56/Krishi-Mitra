import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sprout, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.predict'), href: '/predict' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-gray-900">Kisan Mitra</span>
              <span className="text-xs text-primary-600 font-medium">किसान मित्र</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Language + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
              >
                {t('nav.register')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <LanguageSwitcher />
              </div>
              <div className="mt-3 flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  {t('nav.register')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;