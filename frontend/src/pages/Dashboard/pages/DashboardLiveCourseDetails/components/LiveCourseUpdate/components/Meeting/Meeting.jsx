 import { MdVideoCameraFront } from "react-icons/md";
import './Meeting.css';
import CreateMeeting from './components/Form/FormCreate';
import MeetingCard from './components/MeetingCard/MeetingCard';

 const Meeting = ({liveCourses ,fetchCourse} ) => {
  return (
<div className="CourseCard">
    <div className="Course_card_content">
      <div className="Course_card_info">
        <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdVideoCameraFront /></span></div>
        <div style={{ float: 'left' }}>
          <p className="Course_card_title">Meeting</p>
          <p className="Course_card_amount"> </p>
        </div></div>
      <div className="Course_cardicon">
   <CreateMeeting  liveCourses={liveCourses} fetchCourse={fetchCourse}/>     
  </div></div> 
  {liveCourses && liveCourses.meeting.map(meeting => ( <MeetingCard  key={meeting.id} meeting={meeting}  fetchCourse={fetchCourse}/> ))}
</div> 
  );
};

export default Meeting;
