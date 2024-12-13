import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import UsersTable from './components/UsersTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/users" element={<UsersTable />} />
      </Routes>
    </Router>
  );
}

export default App;
