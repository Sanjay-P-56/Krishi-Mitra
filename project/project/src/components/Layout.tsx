import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-yellow-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;