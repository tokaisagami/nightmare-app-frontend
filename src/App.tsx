import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceholderPage from './PlaceholderPage';
import LoginPage from './components/Login/LoginPage';
import Header from './components/Header/Header';
import UserSignupPage from './components/Signup/UserSignupPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/placeholder" element={<PlaceholderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
