import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceholderPage from './PlaceholderPage';
import LoginPage from './components/Login/LoginPage';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/placeholder" element={<PlaceholderPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
