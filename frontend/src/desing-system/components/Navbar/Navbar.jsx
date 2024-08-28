import React, { useState } from 'react';
import { BsPostcard } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { LuAirplay, LuLogIn } from "react-icons/lu";
import { MdOutlineLiveTv, MdOutlineQuiz } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from '../../Authentication/AxiosInstance';
import OfferMessage from '../OfferMessage/OfferMessage.jsx';
import NavLink from './NavLink.jsx';
import SideNav from './SideNav/SideNav';
import TopSectionBut from './TopSectionBut.jsx';
import './styles.css';
 
   
const Navbar = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const refresh = JSON.parse(localStorage.getItem('refresh_token'));

  const handleLogout = async () => {
    try {
      const res = await AxiosInstance.post('/logout/', { refresh_token: refresh });
      if (res.status === 204) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user'); // Remove user data
        AxiosInstance.defaults.headers.common['Authorization'] = ''; // Clear token from AxiosInstance
        navigate('/login');
        toast.warn('Logout successful');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
    <OfferMessage/>
 <div className="logo">
  <p style={{ textAlign: "center", width: "85%", float: "left"  }}>
 <Link to="/" className='logotext'>Abo Rashad</Link> </p>
 <p style={{ float: "left" , textAlign: "center", width: "15%", padding:'5px',  backgroundColor:'#fff', marginTop:'2px',  }}>
  <button className='buttonSidebar' onClick={toggleSidebar}>=</button></p>
 </div>

 <SideNav showSidebar={showSidebar} toggleSidebar={toggleSidebar} user={user} handleLogout={handleLogout} />

      <div className="topnav">
        <div className='centerNav'>
        {/* <Link to="/">
          <img style={{ width: "110px", padding: "0px 20px 0px 20px" }} src='https://upload.wikimedia.org/wikipedia/commons/6/60/Logo-logosu.png' alt="Logo" />
        </Link> */}
        <Link to="/" className='LogoText'>Abo Rashad</Link>
        <Link to="/">Home</Link>
        <Link to="/AllCourses">All Courses</Link>
        <Link to="/Courses">Courses</Link>
        <Link to="/LiveCourses">Live Courses</Link>
        <Link to="/Quizzes">Quizzes</Link>
        <Link to="/Events">Events</Link> 
       <Link to="/Tricks">Tips & Tricks</Link>  
  
        {user ? (
          <>
             <div class="top-section_Logout">
             <TopSectionBut/>
              <div class="top-Logout"  onClick={handleLogout} > Logout </div>  
         </div>
 
          </>
        ) : (
          <>
        <div class="top-section">
           <Link style={{padding:'0',margin:'0'}} to="/Signup" ><div class=" top-signup" >  Sign Up </div></Link>
           <Link style={{padding:'0',margin:'0'}} to="/login" ><div class="top-login" > Log in </div> </Link>
         </div>
   
          </>
        )}
        </div>
      </div>
     <div className='spece_bottom'/>
      <div className="navbarbottom">
        <Link to="/"><GoHome /> <br /> Home </Link>
        <Link to="/Courses"><LuAirplay /><br /> Courses</Link>
        <Link to="/LiveCourses"><MdOutlineLiveTv /><br />Live Courses</Link>   
        <Link to="/Quizzes"><MdOutlineQuiz /><br /> Quizzes</Link>
        <Link to="/Tricks"><BsPostcard /><br /> Tips & Tricks</Link>
        {user ? (
        <NavLink/>
        ) : (
        <Link to="/login"><LuLogIn /><br /> Login</Link>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
