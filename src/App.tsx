import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CraftPage } from './pages/CraftPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Universal route wrapper that handles GitHub Pages query params & hash routes
const AppRoutes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle ?/admin or ?admin or #/admin GitHub Pages redirects
    const search = window.location.search;
    const hash = window.location.hash;
    const fullHref = window.location.href;

    if (
      search.includes('admin') ||
      hash.includes('admin') ||
      fullHref.includes('/admin')
    ) {
      if (location.pathname !== '/admin') {
        navigate('/admin', { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/craft" element={<CraftPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </Router>
  );
};

export default App;
