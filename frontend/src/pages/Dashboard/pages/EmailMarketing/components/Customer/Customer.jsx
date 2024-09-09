
import React, { useState } from 'react';
import { UserContext } from '../../../../../../desing-system/Authentication/UserProvider';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import StudentsList from './StudentsList/StudentsList';

const Customer = () => {
  const { userData } = UserContext(UserContext); // Use useContext to get userData
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };



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
