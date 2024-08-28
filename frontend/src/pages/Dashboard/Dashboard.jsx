 
import React, { useEffect, useState } from 'react';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance.js';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage.jsx';
import Tabs from '../CourseInfo/components/Tabs/Tabs .jsx';
import './Form.css';
import ApexChart_Location from './components/ApexChart/ApexChart_Location.jsx';
import ApexChart_TotalStudents from './components/ApexChart/ApexChart_TotalStudents.jsx';
import ApexChart_Total_profit from './components/ApexChart/ApexChart_Total_profit.jsx';
import ApexChart_Total_profit_Courses from './components/ApexChart/ApexChart_Total_profit_Courses.jsx';
import ApexChart_Total_profit_Exam from './components/ApexChart/ApexChart_Total_profit_Exam.jsx';
import ApexChart_Total_profit_LiveCourses from './components/ApexChart/ApexChart_Total_profit_LiveCourses.jsx';
import Card from './components/Card/Card.jsx';
import CountryButton from './components/Country/CountryButton.jsx';
import DashboardCards from './components/DashboardCards/DashboardCards.jsx';
import Sidebar_dashboard from './components/Sidebar_dashboard/Sidebar_dashboard';
import Views from './components/Views/Views.jsx';
import './styles.css';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/dashboard/dashboard`);
      setData(response.data);
    } catch (error) {
      setError(error.response.data.error  || "You do not have permission to access this data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();  
  }, []); 

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  const tabData = [
    { title: 'students', content: data ? <ApexChart_TotalStudents data={data?.students_count_by_month} /> : null },
    { title: 'profit Courses', content: data ? <ApexChart_Total_profit_Courses data={data?.profit_Course_by_month} /> : null },
    { title: 'Profit Live Course', content: data ? <ApexChart_Total_profit_LiveCourses data={data?.profit_iveCourse_by_month} /> : null },
    { title: 'profit Exam', content: data ? <ApexChart_Total_profit_Exam data={data?.profit_Exam_by_month} /> : null },
    { title: 'total profit', content: data ? <ApexChart_Total_profit data={data?.total_profit_by_month} /> : null },
    { title: 'Location', content: data ? <ApexChart_Location title="Location" data={data?.country_list} /> : null },
  ];

  return (
 <div className='Dashboard_container'>
          {data &&     <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />}
          {data &&   <div className="head-flex-container">
        <div>
          <samp>
            <button className="ButtonSidebar" onClick={toggleSidebar}>
              =
            </button>
          </samp>
          Dashboard
        </div>
        <div>
  
        </div>
      </div> }
      {data &&   <Views Views={data ? data.views : null} />}
    
      {data &&   <Card data={data} />}
      <div style={{width: '100%', marginTop: '30px', float: 'left'}} />
      {data &&  <Tabs style={{width: '100%'}} tabs={tabData} fetchData={fetchData} />}
      <div style={{width: '100%', marginTop: '30px', float: 'left'}} />
      {data &&  <DashboardCards data={data} />}
      <div style={{width: '100%', marginTop: '30px', float: 'left'}} >
      {data &&  <ApexChart_Location title="Location" data={data ? data.country_list : null} />}
      </div>
      <div style={{width: '100%', marginTop: '30px', float: 'left'}} />
      {data && <CountryButton data={data} />}
    </div>
  );
}
