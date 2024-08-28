 
import SidebarFilter from '../SidebarFilter/SidebarFilter';
import './Filter.css';
import CoursesCard from './components/CoursesCard/CoursesCard';
import ExamCard from './components/ExamCard/ExamCard';
import LiveCoursesCard from './components/LiveCoursesCard/LiveCoursesCard';
export default function Filter({data}) {
 
 
  return (
    <>
      <div className='Filter_section'> 
       <div className='Side'>  
          <SidebarFilter />
        </div>
        <div className='card_list'>
 
          {data.live_courses.map(liveCourse => (<LiveCoursesCard key={liveCourse.id} course={liveCourse} /> ))}
          {data.courses.map(course => (<CoursesCard key={course.id} course={course} /> ))}
          {data.exams.map(exam => (<ExamCard key={exam.id} exam={exam} />))}
        </div>  
      </div>
    </>
  );
}
