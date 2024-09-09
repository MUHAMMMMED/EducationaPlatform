
import React, { useEffect, useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../../../desing-system/components/Loading';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import CourseDelete from './components/CourseUpdateForm/CourseDelete';
import CourseUpdateForm from './components/CourseUpdateForm/CourseUpdateForm';
import FaqsList from './components/FrequentlyAsked/FaqsList';
import QuizList from './components/QuizList/QuizList';
import RateList from './components/Rate/RateList';
import ReviewList from './components/ReviewList/ReviewList';
import SectionsList from './components/Sections/SectionsList';
import SpeakerList from './components/Speaker/SpeakerList';

export default function CourseUpdate() {
  const { id: courseId } = useParams();
  const [Course, setCourse] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    if (!courseId) return;
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/Courses/course_detail/${courseId}/`);
      setCourse(response.data);
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
        <div>
          <samp>
            <button className="ButtonSidebar" onClick={toggleSidebar}> = </button>
          </samp> Dashboard
        </div>
        <div>{Course.title}</div>
        <div>{Course && Course.id && (<CourseDelete Course={Course} />)}</div>
      </div>

      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}>
              <span className='onLine-icon'><GrUpdate /></span>
            </div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">Course</p>
              <p className="Course_card_amount">Update</p>
            </div>
          </div>
          <div className="Course_cardicon">
            {Course && Course.id && (<CourseUpdateForm Course={Course} fetchCourse={fetchCourse} />)}
          </div>
        </div>
      </div>

      {Course && Course.freq && <FaqsList Course={Course} fetchCourse={fetchCourse} />}
      {Course && Course.instructors && <SpeakerList Course={Course} fetchCourse={fetchCourse} />}
      {Course && Course.rate && <RateList Course={Course} fetchCourse={fetchCourse} />}
      {Course && Course.review && <ReviewList Course={Course} fetchCourse={fetchCourse} />}
      {Course && <SectionsList Course={Course} fetchCourse={fetchCourse} />}
      {Course && Course.id && (<QuizList Course={Course} fetchCourse={fetchCourse} />)}
    </>
  );
}
