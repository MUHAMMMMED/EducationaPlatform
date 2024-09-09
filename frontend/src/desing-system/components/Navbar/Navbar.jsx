

import React, { useContext, useState } from 'react';
import { BsPostcard } from "react-icons/bs"; // Icon for Tips & Tricks
import { GoHome } from "react-icons/go"; // Icon for Home
import { LuAirplay, LuLogIn } from "react-icons/lu"; // Icons for Courses and Login
import { MdOutlineLiveTv, MdOutlineQuiz } from "react-icons/md"; // Icons for Live Courses and Quizzes
import { Link, useNavigate } from 'react-router-dom'; // Link for navigation
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import AxiosInstance from '../../Authentication/AxiosInstance'; // Axios instance for API requests
import { UserContext } from '../../Authentication/UserProvider'; // Context for user data
import OfferMessage from '../OfferMessage/OfferMessage.jsx'; // Component for offer messages
import NavLink from './NavLink.jsx'; // Component for navigation link
import SideNav from './SideNav/SideNav'; // Side navigation component
import TopSectionBut from './TopSectionBut.jsx'; // Top section buttons component
import './styles.css'; // Navbar styles

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar
  const { userData } = useContext(UserContext); // Access user data from context

  // // useEffect to handle page reload logic
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Check if the page has already been refreshed
  //       const hasRefreshed = localStorage.getItem('hasRefreshed');
  //       if (!hasRefreshed) {
  //         // Set the refresh flag to avoid multiple reloads
  //         localStorage.setItem('hasRefreshed', 'true');
  //         window.location.reload(); // Reload the page if userData is not available
  //         return;
  //       }
  //       // Clear the refresh flag after successful data load
  //       localStorage.removeItem('hasRefreshed');
  //     } catch (error) {
  //       console.error('Error fetching data:', error); // Log any errors during fetching
  //     }
  //   };

  //   fetchData(); // Call fetchData to handle page refresh logic
  // }, [navigate]); // The effect depends on the navigate function

  const refresh = JSON.parse(localStorage.getItem('refresh_token')); // Get refresh token from localStorage

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const res = await AxiosInstance.post('/logout/', { refresh_token: refresh });
      if (res.status === 204) {
        // Clear localStorage on successful logout
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        AxiosInstance.defaults.headers.common['Authorization'] = ''; // Remove authorization header
        navigate('/login'); // Navigate to login page
        toast.warn('Logout successful'); // Show success toast notification
      }
    } catch (error) {
      console.error('Logout error:', error); // Log any errors during logout
      toast.error('Logout failed'); // Show error toast notification
    }
  };

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Toggle sidebar visibility
  };

  return (
    <>
      <OfferMessage /> {/* Display the offer message component */}
      <div className="logo">
        <p style={{ textAlign: "center", width: "85%", float: "left" }}>
          <Link to="/" className='logotext'>Abo Rashad</Link> {/* Logo with link to home */}
        </p>
        <p style={{ float: "left", textAlign: "center", width: "15%", padding: '5px', backgroundColor: '#fff', marginTop: '2px' }}>
          <button className='buttonSidebar' onClick={toggleSidebar}>=</button> {/* Button to toggle sidebar */}
        </p>
      </div>

      {/* Sidebar component */}
      <SideNav showSidebar={showSidebar} toggleSidebar={toggleSidebar} handleLogout={handleLogout} userData={userData} />

      <div className="topnav">
        <div className='centerNav'>
          <Link to="/" className='LogoText'>Abo Rashad</Link> {/* Link to home */}
          <Link to="/">Home</Link>
          <Link to="/AllCourses">All Courses</Link>
          <Link to="/Courses">Courses</Link>
          <Link to="/LiveCourses">Live Courses</Link>
          <Link to="/Quizzes">Quizzes</Link>
          <Link to="/Events">Events</Link>
          <Link to="/Tricks">Tips & Tricks</Link>

          {userData ? ( // If user is logged in, show logout and profile options
            <>
              <div className="top-section_Logout">
                <TopSectionBut userData={userData} /> {/* User-specific buttons */}
                <div className="top-Logout" onClick={handleLogout}> Logout </div> {/* Logout button */}
              </div>
            </>
          ) : ( // If no user, show login and signup links
            <>
              <div className="top-section">
                <Link style={{ padding: '0', margin: '0' }} to="/Signup">
                  <div className="top-signup">Sign Up</div>
                </Link>
                <Link style={{ padding: '0', margin: '0' }} to="/login">
                  <div className="top-login">Log in</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Space below the top navbar */}
      <div className='spece_bottom' />

      {/* Bottom navbar for mobile */}
      <div className="navbarbottom">
        <Link to="/"><GoHome /><br /> Home</Link>
        <Link to="/Courses"><LuAirplay /><br /> Courses</Link>
        <Link to="/LiveCourses"><MdOutlineLiveTv /><br />Live Courses</Link>
        <Link to="/Quizzes"><MdOutlineQuiz /><br /> Quizzes</Link>
        <Link to="/Tricks"><BsPostcard /><br /> Tips & Tricks</Link>
        {userData ? <NavLink userData={userData} /> : <Link to="/login"><LuLogIn /><br /> Login</Link>} {/* Conditional login/logout links */}
      </div>

      <ToastContainer />
    </>
  );
};

export default Navbar;