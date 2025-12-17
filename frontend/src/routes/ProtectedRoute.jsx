// Protected Route komponenti - himoyalangan sahifalar uchun
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../api';
import { Spin } from 'antd';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!isAuthenticated()) {
        setIsValid(false);
        setChecking(false);
        return;
      }

      try {
        await getCurrentUser();
        setIsValid(true);
      } catch {
        // Token eskirgan - tozalash
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsValid(false);
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, []);

  if (checking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

