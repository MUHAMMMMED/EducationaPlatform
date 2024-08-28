 
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import StudentsList from './StudentsList/StudentsList';
 
const Customer = () => {
  
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
<StudentsList/>

 </div> 
  );
};

export default Customer;
 