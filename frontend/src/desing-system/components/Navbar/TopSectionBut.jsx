import React from 'react';
import { Link } from 'react-router-dom';

const TopSectionBut = ({ userData }) => {

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
