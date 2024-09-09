
import React, { useContext } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../desing-system/Authentication/UserProvider';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import ManagersList from './components/ManagersList/ManagersList';

export default function Manager() {
  const { userData } = useContext(UserContext);

  if (userData && userData?.user_type !== 'M') {
    return <ErrorPage head="Access Denied" error="You do not have the required permissions." />;
  }

  return (
    <div className="CourseCard" style={{ border: '0px solid #58a58f', boxShadow: 'none', width: '80%', marginLeft: '10%', marginBottom: '50px' }}>
      <div className="form-container-half">
        <Link to={`/dashboard`}>
          <span className='onLine-icon'><IoIosArrowBack /></span>
        </Link>
      </div>
      <ManagersList />
    </div>
  );
}