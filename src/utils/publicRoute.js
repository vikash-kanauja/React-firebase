import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return  localStorage.getItem('accessToken') ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
