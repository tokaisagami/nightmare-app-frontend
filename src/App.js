import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlaceholderPage from './PlaceholderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/placeholder" element={<PlaceholderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
