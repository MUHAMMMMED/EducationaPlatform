 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 
import { BsFileArrowDown } from "react-icons/bs";
import AxiosInstance from '../../Authentication/AxiosInstance';

const NavLink = () => {
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
     <Link to="/MyLearning"> <BsFileArrowDown /><br /> My Learning</Link>
      )}
      {userData.user_type === 'T' && (
      <Link to="/Teacher_Dashboard"> <BsFileArrowDown /><br /> Dashboard</Link>
      )}
      {userData.user_type === 'M' && (
        <Link to="/dashboard"> <BsFileArrowDown /><br /> Dashboard</Link>
      )}
    </>
  );
};

export default NavLink;
