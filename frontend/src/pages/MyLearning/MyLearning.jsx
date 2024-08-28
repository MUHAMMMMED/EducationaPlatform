 

import React, { useEffect, useState } from 'react';
import { BiMessageAltX } from "react-icons/bi";
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import CardCoursesList from './components/CardCoursesList/CardCoursesList';
import CardExamsList from './components/CardExamsList/CardExamsList';
import CardliveCoursesList from './components/CardliveCoursesList/CardliveCoursesList';
import Item_list from './components/Item_list';
import './styles.css';

export default function MyLearning() {
  const [learningData, setLearningData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Query/MyLearning/`);
        setLearningData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "You need to log in first to view the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchLearningData();
  }, []);

  if (loading) {
    return <Loading />;
  }
 
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  return (
    <div className='Container'>
      <div className='Event_area'>
        <div className="Event_widget-containe">
          <div className="Even-widget-heading">
            <h2 className="Event_heading-Title"> My Learning</h2>
          </div>
          <div className="Event_widget-p"> Purchased educational courses and exams </div>		
        </div>	
 
        {/* Check if live_courses property exists before rendering */}
        {learningData.live_courses && <CardliveCoursesList data={learningData.live_courses} />}
        
        {/* Check if courses property exists before rendering */}
        {learningData.courses &&
          <CardCoursesList data={learningData.courses} />
        }

        {/* Check if exams property exists before rendering */}
        {learningData.exams && <CardExamsList data={learningData.exams} />}
  
    {learningData.courses.length === 0 && learningData.live_courses.length === 0 && learningData.exams.length === 0 && 
   <div className='No_available'> <BiMessageAltX /> No courses available</div>}
    
           <Item_list/>
 
        <div style={{paddingBottom:'50px',float:"left",width:"100%",height:'150px'}}></div>
      </div>
    </div> 
  );
}
