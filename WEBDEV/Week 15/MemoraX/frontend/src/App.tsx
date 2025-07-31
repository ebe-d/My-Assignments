
import { Dashboard } from './pages/dashboard'
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { QueryClientProvider } from './providers/QueryClientProvider';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <AuthProvider>
          <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App
