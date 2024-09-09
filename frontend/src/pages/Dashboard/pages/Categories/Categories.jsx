import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../desing-system/Authentication/UserProvider';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import Card from './components/Card/Card';

export default function Categories() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { userData } = useContext(UserContext);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (!userData) {
    return <ErrorPage head="Error Occurred" error={error || "User data not found"} />;
  }

  if (userData?.user_type !== 'M') {
    return <ErrorPage head="Access Denied" error="You do not have the required permissions." />;
  }

  return (
    <div className='Dashboard_container'>
      <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="head-flex-container">
        <div>
          <button className="ButtonSidebar" onClick={toggleSidebar}>
            =
          </button>
          Categories
        </div>
      </div>

      <Card />
    </div>
  );
}