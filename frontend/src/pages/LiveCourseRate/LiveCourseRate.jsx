import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import Feedback from './components/Feedback/Feedback';
import Review from './components/Review/Review';

export default function LiveCourseRate() {
  const { id } = useParams();
  const [liveCourseRate, setLiveCourseRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveCourseRate = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/live-course-rateList/${id}/`);
        setLiveCourseRate(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveCourseRate();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  return (
    <>
      <div className='Container'>
        {liveCourseRate.serialized_data && <Review courseId={id} />}
        {liveCourseRate.serialized_data && <Feedback rate={liveCourseRate.serialized_data} />}
      </div>
    </>
  );
}
