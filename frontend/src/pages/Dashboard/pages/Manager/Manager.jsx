 

 import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import ManagersList from './components/ManagersList/ManagersList';

export default function Manager() {
 
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
  
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
 
     <div className="CourseCard" style={{  border:'0px solid #58a58f', boxShadow:'none',width:'80%',marginLeft:'10%',marginBottom:'50px'}}>
    <div className="form-container-half"  >
    <Link to={`/dashboard`}> <span className='onLine-icon' ><IoIosArrowBack /></span> </Link> 
     </div>
       <ManagersList/>
     </div>
 
  )
}