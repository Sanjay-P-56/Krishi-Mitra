import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  Zap, 
  Globe, 
  HeadphonesIcon, 
  ArrowRight, 
  Leaf,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Sprout,
      title: t('home.features.crop.title'),
      description: t('home.features.crop.description'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: t('home.features.fertilizer.title'),
      description: t('home.features.fertilizer.description'),
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Globe,
      title: t('home.features.multilingual.title'),
      description: t('home.features.multilingual.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: HeadphonesIcon,
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Farmers' },
    { icon: TrendingUp, value: '85%', label: 'Accuracy Rate' },
    { icon: Leaf, value: '50+', label: 'Crop Types' },
    { icon: Award, value: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-green-50 to-yellow-50"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-700 font-semibold mb-4">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('home.hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/predict"
                className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="group border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {t('home.hero.secondaryCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary-100 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AI to make smarter farming decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/predict"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Try Prediction Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;