import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowLeft, Sprout, Send } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl">
                <Send className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-8">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('auth.forgot.back')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            {t('auth.forgot.title')}
          </h2>
          <p className="text-gray-600">
            {t('auth.forgot.subtitle')}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('auth.forgot.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="farmer@example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {t('auth.forgot.submit')}
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('auth.forgot.back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;