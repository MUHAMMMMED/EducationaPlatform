import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../config';
import ExamCard from '../../../../desing-system/components/ExamCard/ExamCard ';
import CoursesCard from '../../../../desing-system/components/Filter/components/CoursesCard/CoursesCard';
import LiveCoursesCard from '../../../../desing-system/components/Filter/components/LiveCoursesCard/LiveCoursesCard';
import Loading from '../../../../desing-system/components/Loading';
import { ButtonWrapper, ButtonshowMore, List, No_Available } from './styles';

export default function CoursesList({ query, CategoryId }) {
  const [data, setData] = useState({ courses: [], live_courses: [], exams: [] });
  const [visibleCourses, setVisibleCourses] = useState(3);
  const [VisibleliveCourses, setVisibleliveCourses] = useState(3);
  const [VisibleliveExam, setVisibleliveExam] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/Query/Course_Filter/${CategoryId}/?query=${query}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch courses');
        }
        setData(response.data.results);
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

  const showMoreCourses = () => {
    setVisibleCourses(visibleCourses + 3);
  };
  const showMoreliveCourses = () => {
    setVisibleliveCourses(visibleCourses + 3);
  };
  const showMoreliveExam = () => {
    setVisibleliveExam(visibleCourses + 3);
  };

  return (
    <>
      <List>

        {data && data.live_courses.slice(0, VisibleliveCourses).map(liveCourse => (<LiveCoursesCard key={liveCourse.id} course={liveCourse} />))}
        {data && data.live_courses.length > VisibleliveCourses && (<ButtonWrapper>  <ButtonshowMore onClick={showMoreliveCourses}>Show More</ButtonshowMore> </ButtonWrapper>)}

        {data && data.courses.slice(0, visibleCourses).map(course => (<CoursesCard key={course.id} course={course} />))}
        {data && data.courses.length > visibleCourses && (<ButtonWrapper> <ButtonshowMore onClick={showMoreCourses}>Show More</ButtonshowMore> </ButtonWrapper>)}

        {data && data.exams.slice(0, VisibleliveExam).map(exam => (<ExamCard key={exam.id} exam={exam} />))}
        {data && data.exams.length > VisibleliveExam && (<ButtonWrapper><ButtonshowMore onClick={showMoreliveExam}>Show More</ButtonshowMore></ButtonWrapper>)}

        {data.live_courses.length === 0 && data.courses.length === 0 && data.exams.length === 0 && (
          <No_Available>No courses available</No_Available>
        )}




      </List>
    </>
  );
}









