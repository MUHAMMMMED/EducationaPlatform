
import React from 'react';
import { Link } from 'react-router-dom';

const SideLink = ({ handleSidebarItemClick, userData }) => {

  return (
    <>
      {userData?.user_type === 'S' && (
        <Link to="/MyLearning" className="nav-link" onClick={handleSidebarItemClick}>My Learning</Link>

      )}
      {userData?.user_type === 'T' && (

        <Link to="/Teacher_Dashboard" className="nav-link" onClick={handleSidebarItemClick}>Dashboard</Link>

      )}
      {userData?.user_type === 'M' && (

        <Link to="/dashboard" className="nav-link" onClick={handleSidebarItemClick}>Dashboard</Link>

      )}
    </>
  );
};

export default SideLink;
