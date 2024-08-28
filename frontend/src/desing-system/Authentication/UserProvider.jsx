 
import React, { createContext, useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';
 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await AxiosInstance.get('/get-something/');
        setUserData(res.data);
      } catch (error) {
        // setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

 