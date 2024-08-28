import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../Authentication/AxiosInstance';
 
const TopSectionBut = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await AxiosInstance.get('/get-something/');
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return null; // or a loading indicator
  }

  return (
    <>
      {userData.user_type === 'S' && (
        <Link style={{ padding: '0', margin: '0' }} to="/MyLearning">
          <div className="top-Learn">My Learning</div>
        </Link>
      )}
      {userData.user_type === 'T' && (
        <Link style={{ padding: '0', margin: '0' }} to="/Teacher_Dashboard">
          <div className="top-Learn">  Dashboard</div>
        </Link>
      )}
      {userData.user_type === 'M' && (
        <Link style={{ padding: '0', margin: '0' }} to="/dashboard">
          <div className="top-Learn"> Dashboard</div>
        </Link>
      )}
    </>
  );
};

export default TopSectionBut;
