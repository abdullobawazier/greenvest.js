import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard'; 

function App() {
  const hasToken = () => {
    return localStorage.getItem('admin_token') !== null;
  };

  return (
    <Router>
      <Routes>
        {/* 1. Jalur Halaman Login */}
        <Route 
          path="/" 
          element={hasToken() ? <Navigate to="/dashboard" replace /> : <Login />} 
        />

        {/* 2. Jalur Halaman Dashboard */}
        <Route 
          path="/dashboard" 
          element={hasToken() ? <Dashboard /> : <Navigate to="/" replace />} 
        />

        {/* 3. Pengaman jika mengetik alamat asal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;