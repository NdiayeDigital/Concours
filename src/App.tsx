import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main One-Page Scroll website */}
        <Route path="/" element={<HomePage />} />

        {/* Secure admin dashboard */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
