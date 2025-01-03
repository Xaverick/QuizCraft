import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const auth = {'token': localStorage.getItem('token'), 'expiresIn':  new Date(JSON.parse(localStorage.getItem('expiresIn')))}

  return auth.token && auth.expiresIn > Date.now() ? <Component /> : <Navigate to='/login' />
};

export default ProtectedRoute;
