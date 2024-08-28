import React, { useEffect, useState } from 'react';
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlineCampaign } from "react-icons/md";
import { Link } from 'react-router-dom';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import RunCampaign from './components/RunCampaign/RunCampaign';
import './styles.css';
 
export default function EmailMarketing() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await AxiosInstance.get('/get-something/');
        setUserData(res.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  if (userData && userData.user_type !== 'M') {
    return <ErrorPage head="Access Denied" error="You do not have the required permissions." />;
  }

  return (
    <div className='Dashboard_container'>
      <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <RunCampaign />
      <div className="Course_card">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}>
              <span className='onLine-icon'><MdOutlineCampaign /></span>
            </div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title" style={{ marginTop: '20px' }}>Campaign</p>
            </div>
          </div>
          <div className="Course_cardicon">
            <Link to={'/Campaign'}>
              <button className="Open_button">Open</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="Course_card">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}>
              <span className='onLine-icon'><FaUsersViewfinder /></span>
            </div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title" style={{ marginTop: '20px' }}>Customer</p>
            </div>
          </div>
          <div className="Course_cardicon">
            <Link to={'/Customer'}>
              <button className="Open_button">Open</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
