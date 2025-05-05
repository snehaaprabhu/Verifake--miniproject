import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';    // <-- import this

import './index.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
