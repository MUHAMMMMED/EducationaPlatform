import React from 'react';
import { Link } from 'react-router-dom';
import SideLink from './SideLink';
import './styles.css';

const SideNav = ({ showSidebar, toggleSidebar, handleLogout, userData }) => {

  // Function to handle sidebar item click
  const handleSidebarItemClick = () => {
    // Hide the sidebar after clicking on an item
    if (showSidebar) {
      toggleSidebar();
    }
  };
  const handleLogoutWithSidebar = () => {
    handleSidebarItemClick();
    handleLogout();
  };
  return (
    <div className={`sidenav ${showSidebar ? 'open' : ''}`}>
      <Link to="/" className="nav-link  " style={{ paddingTop: '50px' }} onClick={handleSidebarItemClick}>Home</Link>
      <Link to="/AllCourses" className="nav-link" onClick={handleSidebarItemClick}>All Courses</Link>
      <Link to="/Courses" className="nav-link" onClick={handleSidebarItemClick}>Courses</Link>
      <Link to="/LiveCourses" className="nav-link" onClick={handleSidebarItemClick}>Live Courses</Link>
      <Link to="/Quizzes" className="nav-link" onClick={handleSidebarItemClick}>Quizzes</Link>
      <Link to="/Events" className="nav-link" onClick={handleSidebarItemClick}>Events</Link>
      <Link to="/Tricks" className="nav-link" onClick={handleSidebarItemClick}>Tips & Tricks</Link>

      {userData ? (
        <>
          <Link className="nav-link Logout" to="/login" onClick={handleLogoutWithSidebar}>Logout</Link>
          <SideLink handleSidebarItemClick={handleSidebarItemClick} userData={userData} />
        </>
      ) : (
        <>
          {/* Links for non-authenticated users */}
          <Link className="nav-link" to="/login" onClick={handleSidebarItemClick}>Login</Link>
          <Link className="nav-link" to="/signup" onClick={handleSidebarItemClick}>Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default SideNav;
