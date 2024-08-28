import React from 'react';
import { FiUsers } from "react-icons/fi";
import { MdOutlineQuiz } from "react-icons/md";
import './styles.css';

export default function Card({data}) {
  return (
<div className='sectionCard'>
<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.manager_count}</div>
<div className='Card_text'> Manager</div>
</div></div>

<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.teacher_count}</div>
<div className='Card_text'> Teacher</div>
</div></div>

<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.students_count}</div>
<div className='Card_text'> Students</div>
</div></div>





<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.course_count}</div>
<div className='Card_text'>  Courses </div>
</div></div>
 
<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.live_course_count} </div>
<div className='Card_text'> CoursesLive </div>
</div></div>

<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><MdOutlineQuiz /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.exam_count}</div>
<div className='Card_text'>Quiz </div>
</div></div>

 
<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.user_course_count}</div>
<div className='Card_text'>  Courses students</div>
</div></div>
 
<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><FiUsers /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.user_live_courses_count} </div>
<div className='Card_text'> Live Courses students</div>
</div></div>

<div className='Card_list'>
<div className='Card_row'><samp className='icon_Fi'><MdOutlineQuiz /></samp></div>
<div className='Card_row1'>
<div className='Card_number'> {data.user_exam_count}</div>
<div className='Card_text'>Quiz students</div>
</div></div>

 

</div>  
  )
}
