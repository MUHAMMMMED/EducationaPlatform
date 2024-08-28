import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import DownTimer from './components/DownTimer/DownTimer';
import FormUpdate from './components/Form/FormUpdate';
import Head from './components/Head';
import JoinButtons from './components/JoinButtons/JoinButtons';
import NewAsk from './components/NewAsk/NewAsk';
import Post from './components/Post/Post';

 
export default function LiveCourseWaiting() {
    const { id: courseId } = useParams();
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    const fetchCourse = async () => {
      try {
        if (!courseId) return;
        const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/waiting_room/${courseId}`, );
        setCourseData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "The Course is currently unavailable or requires purchasing access rights, or has been transferred to another stage.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => { fetchCourse(); }, [courseId]);
      

    if (loading) {
      return <Loading />;
    }
  
    if (error) {
      return <ErrorPage head="Error Occurred" error={error} />;
    }

    return (
      <>
            <Head data={courseData} />
            <div className='Container'>

            {courseData && courseData.is_author.is_author === 'true' &&   <FormUpdate data={courseData} fetchCourse={fetchCourse}  />  }

            <DownTimer data={courseData} />
            <JoinButtons data={courseData}/> 
            <NewAsk data={courseData} fetchCourse={fetchCourse} />
            <Post data={courseData} fetchCourse={fetchCourse} is_author={courseData.is_author.is_author}  />
            </div>

        </>
    );
}
