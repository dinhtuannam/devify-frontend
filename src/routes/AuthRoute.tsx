import { Navigate, Outlet } from 'react-router-dom';
import useCheckLogin from '../hooks/useCheckLogin';

const Auth = () => {
    const user = useCheckLogin();

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
