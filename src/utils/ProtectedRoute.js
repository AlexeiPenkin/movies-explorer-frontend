import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ login, children }) => {
  return <>{login ? children : <Navigate to='/' />}</>;
};
