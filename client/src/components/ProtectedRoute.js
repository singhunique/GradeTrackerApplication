import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Replace this with your actual auth logic (e.g., a token in localStorage or a Context value)
  const isAuthenticated = !!localStorage.getItem('token'); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;