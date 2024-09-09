
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../config';
import LiveCoursesCard from '../../../../desing-system/components/Filter/components/LiveCoursesCard/LiveCoursesCard';
import Loading from '../../../../desing-system/components/Loading';
import { ButtonWrapper, ButtonshowMore, List, No_Available } from './styles';

export default function CoursesList({ query }) {
  const [data, setData] = useState();
  const [visibleCourses, setVisibleCourses] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/LiveCourses/LiveCourse_Filter/?query=${query}`);
        setData(response.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [query]);

  if (isLoading) {
    return <Loading />;
  }
  const showMoreCourses = () => { setVisibleCourses(visibleCourses + 10); };
  return (
    <>
      <List>
        {data && data.slice(0, visibleCourses).map((course) => (
          <LiveCoursesCard key={course.id} course={course} />
        ))}
        {data && data.length === 0 && <No_Available>   No courses available</No_Available>}



        {data && data.length > visibleCourses && (
          <ButtonWrapper> <ButtonshowMore onClick={showMoreCourses}>Show More</ButtonshowMore> </ButtonWrapper>
        )}


      </List>
    </>
  );
}