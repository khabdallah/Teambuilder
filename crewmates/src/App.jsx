// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import SummaryPage from './pages/SummaryPage';
import EditPage from './pages/EditPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/crew" element={<SummaryPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
