import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../config';
import { ButtonWrapper, ButtonshowMore, List, No_Available } from './styles';
 
import CoursesCard from '../../../../desing-system/components/CoursesCard/CoursesCard';
import ExamCard from '../../../../desing-system/components/ExamCard/ExamCard ';
import LiveCoursesCard from '../../../../desing-system/components/LiveCoursesCard/LiveCoursesCard';
   
export default function CoursesList({ query }) {
  const [data, setData] = useState({ courses: [], live_courses: [], exams: [] });
  const [visibleCourses, setVisibleCourses] = useState(3);
  const [VisibleliveCourses, setVisibleliveCourses] = useState(3);
  const [VisibleliveExam, setVisibleliveExam] = useState(3);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/Query/Filter/?query=${query}`);
        if (response.status !== 200) {
          throw new Error( );
        }
        setData(response.data.results);
      } catch (error) {
  
      }
    };

    fetchCourses();
  }, [query]);

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

        { data && data.live_courses.slice(0, VisibleliveCourses).map(liveCourse => ( <LiveCoursesCard key={liveCourse.id}  course ={liveCourse} /> ))}
        {data && data.live_courses.length > VisibleliveCourses && ( <ButtonWrapper>  <ButtonshowMore onClick={showMoreliveCourses}>Show More</ButtonshowMore> </ButtonWrapper> )} 

        {data && data.courses.slice(0, visibleCourses).map(course => (<CoursesCard key={course.id} course={course} />  ))}
        {data && data.courses.length > visibleCourses && ( <ButtonWrapper> <ButtonshowMore onClick={showMoreCourses}>Show More</ButtonshowMore> </ButtonWrapper> )}

        {data && data.exams.slice(0, VisibleliveExam).map(exam => ( <ExamCard key={exam.id} exam={exam} />))}
        {data && data.exams.length > VisibleliveExam && (  <ButtonWrapper><ButtonshowMore onClick={showMoreliveExam}>Show More</ButtonshowMore></ButtonWrapper>  )} 
      
        {data  && data.courses.length === 0 && data.live_courses.length === 0 && data.exams.length === 0 &&    <No_Available>   No courses available</No_Available>}

      </List>
    </>
  );
}
