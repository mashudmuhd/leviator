import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CraftPage } from './pages/CraftPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/craft" element={<CraftPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </PageLayout>
    </Router>
  );
};

export default App;
