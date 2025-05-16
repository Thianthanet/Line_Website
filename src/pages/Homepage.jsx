import { useState, useEffect } from 'react';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Homepage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeLiff = async () => {
    try {
      await liff.init({ liffId: "2007368813-M6JWQelg" });
      
      if (!liff.isLoggedIn()) {
        return liff.login();
      }

      const profile = await liff.getProfile();
      const userId = profile.userId;
      login({ userId });

      await handleUserNavigation(userId);
      
    } catch (err) {
      console.error('LIFF Error:', err);
      setError('Failed to initialize LINE integration. Please try again.');
      navigate('/register');
    } finally {
      setLoading(false);
    }
  };

  const handleUserNavigation = async (userId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getUser/${userId}`, {
        withCredentials: true
      });
      
      const user = res.data;
      console.log('User data:', user);

      // Redirect based on role
      switch (user?.data?.role) {
        case 'user':
          navigate('/repair');
          break;
        case 'technician':
          navigate('/technician');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/register');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to fetch user data. Redirecting to registration...');
      navigate('/register');
    }
  };

  useEffect(() => {
    initializeLiff();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <p>Please wait while we redirect you...</p>
      </div>
    );
  }

  return null;
}

export default Homepage;