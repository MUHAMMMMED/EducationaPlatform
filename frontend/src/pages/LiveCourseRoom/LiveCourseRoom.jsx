import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import DownTimer from './components/DownTimer/DownTimer';
import FormUpdateMeeting from './components/Form/FormUpdateMeeting';
import Head from './components/Head/Head';
import NewAsk from './components/NewAsk/NewAsk';
import Post from './components/Post/Post';
import Reviews from './components/Reviews/Reviews';
import Timeline from './components/Timeline/Timeline';
import './styles.css';
    
export default function LiveCourseRoom() {
  const { id: courseId } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    try {
      if (!courseId) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/live_room/${courseId}`);
      setCourseData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "The Course is currently unavailable or requires purchasing access rights, or has been transferred to another stage.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }
 
     
  return (
    <>
      {courseData && <Head data={courseData} />}
      <div className='Container'>
        <div className='LiveCourseRoomCenter'>
          { courseData&& courseData?.timeline_meeting && courseData.timeline_meeting?.roomId &&
            <FormUpdateMeeting data={courseData} is_author={courseData?.is_author} fetchCourse={fetchCourse} />}
 
          {courseData &&
            <DownTimer
              date={courseData?.timeline_meeting?.date}
              time={courseData?.timeline_meeting?.start_time}
              join_meeting={courseData?.timeline_meeting?.roomId}
              join_meeting_link={courseData?.timeline_meeting?.join_meeting_link}
              courseId={courseData?.id}
              roomId={courseData?.timeline_meeting?.roomId}
            />}
        </div>
        <div className="loader" />
       {courseData &&
          <>
            <Timeline  data={courseData} fetchCourse={fetchCourse} is_author={courseData?.is_author} />
            <Reviews data={courseData}/>
            <NewAsk data={courseData} fetchCourse={fetchCourse} />
            <Post data={courseData} fetchCourse={fetchCourse} is_author={courseData?.is_author} />
          </>
        } 
      </div>
    </>
  );
}
