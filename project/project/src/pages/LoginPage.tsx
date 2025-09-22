import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, Sprout } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-2xl">
              <Sprout className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
            {t('auth.login.title')}
          </h2>
          <p className="text-gray-600">
            {t('auth.login.subtitle')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.login.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="farmer@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {t('auth.login.submit')}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                {t('auth.login.forgot')}
              </Link>
            </div>
          </form>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <Link
              to="/register"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              {t('auth.login.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;