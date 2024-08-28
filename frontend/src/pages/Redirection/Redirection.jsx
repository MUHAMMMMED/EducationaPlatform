import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';

const Redirection = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await AxiosInstance.get('/get-something/');
        setUserData(res.data);
      } catch (error) {
    
      } finally {
        setLoading(false);
      }
    };
 
    fetchUserData();
  }, []);
 
  useEffect(() => {
    if (loading) return;

    if (!userData) {
        navigate('/');
      return;
    }

    switch (userData.user_type) {
      case 'S':
        navigate('/MyLearning');
        break;
      case 'T':
        navigate('/Teacher_Dashboard');
        break;
      case 'M':
        navigate('/dashboard');
        break;
      default:
        navigate('/');
        break;
    }
  }, [userData, loading, navigate]);

  if (loading) {
    return <Loading />;
  }
 
  return null;  
};

export default Redirection;
