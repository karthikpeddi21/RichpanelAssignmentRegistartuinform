import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import UserDetailsPage from './components/UserDetailsPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/user-details" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
