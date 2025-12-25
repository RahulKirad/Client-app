import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AdminRoutes from './pages/AdminRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
