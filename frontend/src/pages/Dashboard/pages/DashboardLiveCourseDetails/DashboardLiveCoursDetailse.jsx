 
import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../desing-system/components/Loading';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import Tabs from '../../../CourseInfo/components/Tabs/Tabs ';
import ApexChart_Location_country from '../../components/ApexChart/ApexChart_Location_country';
import ApexChart_TotalStudents from '../../components/ApexChart/ApexChart_TotalStudents';
import ApexChart_Total_profit from '../../components/ApexChart/ApexChart_Total_profit';
import DashboardCards from '../../components/DashboardCards/DashboardCards';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import Teacher from '../../components/Teacher/Teacher';
import Views from '../../components/Views/Views';
import CountryButton from './components/Country/CountryButton';
import PromoCodes from './components/PromoCodes/PromoCodes';
import StudentsList from './components/StudentsList/StudentsList';




export default function DashboardLiveCoursDetailse() {
  const { id:courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
 
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




    const fetchCourseDetail = async () => {
      try {
        if (!courseId) return;
        const response = await AxiosInstance.get(`${Config.baseURL}/dashboard/LiveCourse_detail/${courseId}`);
        setCourseDetail(response.data);
      } catch (error) {
        setError(error.response.data.error  || "You do not have permission to access this data.");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);
 
 if (loading) {
  return <Loading />;
}

if (error) {
  return <ErrorPage head="Error Occurred" error={error} />;
}

  const tabData = [
    { title: 'students', content: <ApexChart_TotalStudents  data={courseDetail.students_count_by_month}   />},
    { title: 'total profit  ', content:  <ApexChart_Total_profit data={courseDetail.total_profit_by_month}  /> },
    
  ];
    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
  
  return (
    <div className='Dashboard_container'>
      <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

      <div class="head-flex-container">
        <div>
          <samp><button className='ButtonSidebar' onClick={toggleSidebar}>=</button></samp>Dashboard
        </div>
        <div>
        <Link to={`/Live_Course_Update/${courseId}`}>  <button class="Creat_button">Update</button> </Link>    
         </div>   </div>

      <div class="head-flex-container">  <div style={{width:'100%',color:'#58a58f', fontWeight:'700'}}>  {courseDetail.title}   </div> </div>
      <Teacher image={courseDetail.author.width_image} name={courseDetail.author.user_full_name} />

      <Views Views={courseDetail?.views }/>
  
      <div style={{ width: '100%', marginTop: '30px', float: 'left' }} />
      <DashboardCards data={courseDetail} />
      <StudentsList Id={courseId} />
        <div style={{width:'100%', marginTop:'30px', float:'left'}}/> 
      <Tabs style={{width:'100%'}}   tabs={tabData}   /> 
      <div style={{width:'100%', marginTop:'30px', float:'left'}}/>
 
     <PromoCodes Id={courseId} />
     <div style={{width:'100%', marginTop:'30px', float:'left'}} > 
     <ApexChart_Location_country title="Location " data={courseDetail?.country_counts} /> </div>  

      {courseDetail&&courseDetail.country_name&&courseId&&  
     
     <CountryButton data={courseDetail.country_name} courseId={courseId} /> }
      
    </div>
  );
}
