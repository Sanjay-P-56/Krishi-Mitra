import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Users, Award, Lightbulb, Heart, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower Indian farmers with cutting-edge AI technology for smarter, more sustainable farming practices.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Built by farmers, for farmers. We understand the challenges and provide practical solutions.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Over 85% accuracy in crop predictions with thousands of successful farming recommendations.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging the latest in machine learning and agricultural science for better farming outcomes.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const team = [
    {
      name: 'Likhith K',
      role: 'WEB Developer',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Full-stack developer crafting seamless digital experiences. Focused on performance, accessibility, and cutting-edge tech.'
    },
    {
      name: 'Channapa Mahabaleswar Dambal',
      role: 'AI/ML Expert',
      image: 'https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'AI researcher & developer bridging the gap between theory and real-world applications. Experienced in LLMs, generative AI, and predictive analytics.'
    },
    {
      name: 'Rakesh Enagi',
      role: 'APP Developer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Android/iOS specialist turning ideas into polished apps. Expertise in Kotlin, Swift, and Firebase integration.'
    },
    {
      name: 'Keerthan R',
      role: 'AI/ML Expert',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Machine learning developer focused on deep learning and data-driven solutions. Strong expertise in model optimization & deployment (MLOps).'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-green-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Kisan Mitra
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize Indian agriculture through AI-powered insights, 
            helping farmers make informed decisions for better yields and sustainable farming practices.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Kisan Mitra was born from a simple observation: Indian farmers possess generations 
                  of agricultural wisdom, but often lack access to modern data-driven insights that 
                  could enhance their decision-making.
                </p>
                <p className="mb-6">
                  Founded in 2025, our platform combines traditional farming knowledge with 
                  cutting-edge artificial intelligence to provide personalized crop and fertilizer 
                  recommendations based on soil conditions, weather patterns, and regional data.
                </p>
                <p>
                  Today, we serve thousands of farmers across India, supporting them in multiple 
                  regional languages and helping them achieve better yields while promoting 
                  sustainable farming practices.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Farmers working in the field"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div>
                    <div className="font-bold text-gray-900">10,000+</div>
                    <div className="text-sm text-gray-600">Happy Farmers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
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

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A diverse group of agricultural experts, technologists, and rural development specialists 
              working together to transform Indian agriculture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="h-12 w-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Accessibility</h3>
              <p className="text-primary-100">
                Making advanced agricultural technology accessible to every farmer, regardless of their location or resources.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Sustainability</h3>
              <p className="text-primary-100">
                Promoting farming practices that protect the environment while ensuring long-term productivity.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-primary-100">
                Building a supportive community where farmers can learn, share, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;