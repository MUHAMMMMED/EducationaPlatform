

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../../desing-system/Authentication/UserProvider';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import StudentsList from './StudentsList/StudentsList';

const Customer = () => {
  const { userData } = useContext(UserContext); // Use useContext correctly
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // useEffect to handle page reload logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        if (!hasRefreshed) {
          localStorage.setItem('hasRefreshed', 'true');
          window.location.reload(); // Reload the page if userData is not available
          return;
        }
        localStorage.removeItem('hasRefreshed');
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors during fetching
      }
    };

    fetchData();
  }, []); // Removed the navigate dependency as it's not defined

  // Handle access denied based on user_type
  if (userData && userData?.user_type !== 'M') {
    return <ErrorPage head="Access Denied" error="You do not have the required permissions." />;
  }

  return (
    <div className='Dashboard_container'>
      <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <StudentsList />
    </div>
  );
};

export default Customer;