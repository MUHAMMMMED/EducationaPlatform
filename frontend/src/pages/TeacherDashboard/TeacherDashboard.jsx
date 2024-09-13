
import React, { useEffect, useState } from 'react';
import { BiMessageAltX } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import './styles.css';

export default function TeacherDashboard() {
  const [data, setData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Query/Teacher_Dashboard/`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "You need to log in first to view the page.");
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
    <>
      <div className='Container'>

        <div className='Grid'>

          <div className="Event_widget-containe">
            <div className="Even-widget-heading">
              <h2 className="Event_heading-Title"> My Courses</h2>
            </div>
          </div>

          {data && data.map(item => (
            <div key={item.id} className="Teacher_card">
              {item.card_image && <img className="card__img" src={`${Config.mediaURL}${item.card_image}`} alt={item.name} />}
              <div className="card__content">
                <h1 className="card__header">{item.title} </h1>
                <Link to={`/LiveCourseRoom/${item.id}/`} className="card__link">
                  <button className="card__btn">Live Room <span>&rarr;</span></button>
                </Link>
                <Link to={`/LiveCourseWaiting/${item.id}/`} className="card__link">
                  <button className="card__btn">Waiting Room <span>&rarr;</span></button>
                </Link>
              </div>
            </div>
          ))}

          {data.length === 0 && <div className='No_Available'> <BiMessageAltX /> No courses available</div>}

        </div>
      </div>
    </>
  );
}
