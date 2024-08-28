 
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import { BsCalendar4Event } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdLiveTv, MdOndemandVideo, MdOutlineManageAccounts, MdOutlineQuiz } from "react-icons/md";
import { PiNewspaperClipping, PiStudentLight } from "react-icons/pi";
import { RiSettings3Line } from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";
import { TbCategoryPlus } from "react-icons/tb";

const Sidebar_dashboard = ({ showSidebar, toggleSidebar }) => {
  // Function to handle sidebar item click
  const handleSidebarItemClick = () => {
    // Hide the sidebar after clicking on an item
    if (showSidebar) {
      toggleSidebar();
    }
  }; 

  return (
    <div className={`SideNav ${showSidebar ? 'Open-Link' : ''}`}>
      <br/>  <br/>
      <Link to="/" className="Nav-Link" onClick={handleSidebarItemClick}> <span className='iconlink'>  <CgWebsite /></span> Abo Rashad</Link>
      <Link to="/dashboard" className="Nav-Link" onClick={handleSidebarItemClick}> <span className='iconlink'>  <GoHome /></span> Dashboard</Link>
 
      <Link to="/email_marketing" className="Nav-Link" onClick={handleSidebarItemClick}> <span className='iconlink'>  <SiMinutemailer /></span> Email Marketing</Link>

  
      <Link to="/manager" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><MdOutlineManageAccounts /></span> Manager</Link>      
      <Link to="/teacher" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><LiaChalkboardTeacherSolid /></span> Teachers</Link>
      <Link to="/students" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><PiStudentLight /></span> Students</Link>      
      <Link to="/categories" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><TbCategoryPlus /></span> Categories</Link>

      <Link to="/dashboard_LiveCourse" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><MdLiveTv /></span>LiveCourse</Link>
      <Link to="/dashboard_Course" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'> <MdOndemandVideo /></span>Course</Link>
      <Link to="/dashboard_Quiz" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><MdOutlineQuiz /></span>Quiz</Link>

      <Link to="/tricks_list" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><PiNewspaperClipping /></span> Tips & Tricks</Link>

      <Link to="/events_list" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><BsCalendar4Event /></span> Events</Link>
      <Link to="/setting" className="Nav-Link" onClick={handleSidebarItemClick}><span className='iconlink'><RiSettings3Line /></span> Settings</Link>
    </div>
  );
};

export default Sidebar_dashboard;
 