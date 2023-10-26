import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginMERT from './LoginMERT';
import RegisterMERT from './RegisterMERT';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMERT />} />
        <Route path="/register" element={<RegisterMERT />} />
        <Route path="/login" element={<LoginMERT />} />
      </Routes>
    </Router>
  );
}

export default App;

