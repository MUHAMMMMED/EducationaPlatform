import React, { useEffect, useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../../../desing-system/components/Loading';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import BaseList from './components/Base/BaseList';
import CourseDefinitionList from './components/CourseDefinition/CourseDefinitionList';
import LearningPathPointList from './components/LearningPathPoint/LearningPathPointList';
import LiveCoursefaqsList from './components/LiveCourseFrequentlyAsked/LiveCoursefaqsList';
import LiveCourseRateList from './components/LiveCourseRate/LiveCourseRateList';
import LiveCourseReviewList from './components/LiveCourseReview/LiveCourseReviewList';
import LiveCourseDelete from './components/LiveCourseUpdateForm/LiveCourseDelete';
import LiveCourseUpdateForm from './components/LiveCourseUpdateForm/LiveCourseUpdateForm';
import Meeting from './components/Meeting/Meeting';
import SpeakerList from './components/Speaker/SpeakerList';
import Timeline from './components/Timeline/Timeline';
import UpdatTimelineMeetingList from './components/UpdatTimelineMeeting/UpdatTimelineMeetingList';
import './styles.css';



export default function LiveCourseUpdate() {
 
  const { id: courseId } = useParams();
  const [liveCourses, setLiveCourses] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
 
  const fetchCourse = async () => {
    if (!courseId) return;
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/live-courses/${courseId}/`);
      setLiveCourses(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "You do not have permission to access this data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const toggleSidebar = () => { setShowSidebar(!showSidebar); };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  } 
  return (
    <>
      <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="head-flex-container">
      <div><samp> <button className="ButtonSidebar" onClick={toggleSidebar}> = </button></samp> Dashboard </div>
      <div> {liveCourses.title} </div>
      <div> 
  {liveCourses && liveCourses.id && ( <LiveCourseDelete liveCourseId={liveCourses.id} />)} 
  
  </div></div>     
          
        <div className="CourseCard">
        <div className="Course_card_content">
        <div className="Course_card_info">
        <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><GrUpdate /></span></div>
        <div style={{ float: 'left' }}>
        <p className="Course_card_title">Live Course</p>
        <p className="Course_card_amount"> </p></div> </div>
        <div className="Course_cardicon">
        {liveCourses &&liveCourses.id&& <LiveCourseUpdateForm liveCourses={liveCourses} /> }    
       </div></div>  </div> 
       {liveCourses && liveCourses.id && (  <BaseList liveCourses={liveCourses} fetchCourse={fetchCourse} />)}
 
       {liveCourses && liveCourses.base && liveCourses.base.id && (
       <>
       <CourseDefinitionList liveCourses={liveCourses} fetchCourse={fetchCourse} />
      <LearningPathPointList liveCourses={liveCourses} fetchCourse={fetchCourse} />
      <LiveCoursefaqsList liveCourses={liveCourses} fetchCourse={fetchCourse} />
      <SpeakerList liveCourses={liveCourses} fetchCourse={fetchCourse} />
      <LiveCourseRateList liveCourses={liveCourses} fetchCourse={fetchCourse} />
      <LiveCourseReviewList liveCourses={liveCourses} fetchCourse={fetchCourse} />

 
       {liveCourses && liveCourses.id && (  <UpdatTimelineMeetingList liveCourses={liveCourses} fetchCourse={fetchCourse} />)}



      <Meeting liveCourses={liveCourses } fetchCourse={fetchCourse} /> 
      {liveCourses &&liveCourses.timeline&& 
      <Timeline liveCourses={liveCourses } fetchCourse={fetchCourse} />}
      <div style={{ float:'left', width:'100%',height:'50px'}}/>
  </>
)}
 </>
  );
}
