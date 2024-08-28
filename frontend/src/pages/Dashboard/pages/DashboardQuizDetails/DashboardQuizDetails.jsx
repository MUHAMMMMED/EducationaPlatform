 
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


export default function DashboardQuizDetails() {
  const { id: quizId } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const [QuizDetail, setQuizDetail] = useState(null);

  useEffect(() => {
    const fetchquizDetail = async () => {
      try {
        if (!quizId) return;
        const response = await AxiosInstance.get(`${Config.baseURL}/dashboard/quiz_detail/${quizId}`);
        setQuizDetail(response.data);
      } catch (error) {
        setError(error.response.data.error  || "You do not have permission to access this data.");
      } finally {
        setLoading(false);
      }
    };
     fetchquizDetail();
  }, [quizId ]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }
  const tabData = [
    { title: 'students', content: <ApexChart_TotalStudents  data={QuizDetail.students_count_by_month}   />},
    { title: 'total profit  ', content:  <ApexChart_Total_profit data={QuizDetail.total_profit_by_month}  /> },
    
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
       <Link to={`/Quiz_Update/${quizId}`}>  <button class="Creat_button">Update</button> </Link> </div> </div>   
       <div class="head-flex-container">  <div style={{width:'100%',color:'#58a58f', fontWeight:'700'}}> 
       {QuizDetail.title}   </div> </div>
       <Teacher image={QuizDetail.creator.width_image} name={QuizDetail.creator.user_full_name} />
       <Views Views={QuizDetail?.views }/>

        {QuizDetail&&QuizDetail.creator.id&& <Link to={`/QuestionBank/${QuizDetail.creator.id}`}>  <button class="Creat_button">Question Bank</button> </Link>} 
       <div style={{ width: '100%', marginTop: '30px', float: 'left' }} />
       <DashboardCards data={QuizDetail} />
       <StudentsList Id={QuizDetail.id} />
       <div style={{width:'100%', marginTop:'30px', float:'left'}}/> 
       <Tabs style={{width:'100%'}}   tabs={tabData}   /> 
       <div style={{width:'100%', marginTop:'30px', float:'left'}}/>   
       <PromoCodes Id={QuizDetail.id} />
 
       <div style={{width:'100%', marginTop:'30px', float:'left'}} > 
      <ApexChart_Location_country title="Location " data={QuizDetail?.country_counts} /> </div>  
      {QuizDetail&&QuizDetail.country_name&&quizId&&  
      <CountryButton data={QuizDetail?.country_name} courseId={quizId} /> }
 
    </div>
  );
}
