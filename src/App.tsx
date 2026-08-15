import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CraftPage } from './pages/CraftPage';

export const App: React.FC = () => {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/craft" element={<CraftPage />} />
        </Routes>
      </PageLayout>
    </Router>
  );
};

export default App;
