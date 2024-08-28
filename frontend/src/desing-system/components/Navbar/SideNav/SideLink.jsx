 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../../Authentication/AxiosInstance';
 
const SideLink = ({handleSidebarItemClick}) => {
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
    return null;  
  }

  return (
    <>
      {userData.user_type === 'S' && (
  
     <Link to="/MyLearning" className="nav-link" onClick={handleSidebarItemClick}>My Learning</Link>
 
      )}
      {userData.user_type === 'T' && (
 
      <Link to="/Teacher_Dashboard" className="nav-link" onClick={handleSidebarItemClick}>Dashboard</Link>

      )}
      {userData.user_type === 'M' && (
   
        <Link to="/dashboard" className="nav-link" onClick={handleSidebarItemClick}>Dashboard</Link>
 
      )}
    </>
  );
};

export default SideLink;
