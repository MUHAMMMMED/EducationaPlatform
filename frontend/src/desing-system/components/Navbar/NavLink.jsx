import React from 'react';
import { BsFileArrowDown } from "react-icons/bs";
import { Link } from 'react-router-dom';

const NavLink = ({ userData }) => {
  return (
    <>
      {userData?.user_type === 'S' && (<Link to="/MyLearning"> <BsFileArrowDown /><br /> My Learning</Link>)}

      {userData?.user_type === 'T' && (<Link to="/Teacher_Dashboard"> <BsFileArrowDown /><br /> Dashboard</Link>)}

      {userData?.user_type === 'M' && (<Link to="/dashboard"> <BsFileArrowDown /><br /> Dashboard</Link>)}

    </>
  );
};

export default NavLink;
