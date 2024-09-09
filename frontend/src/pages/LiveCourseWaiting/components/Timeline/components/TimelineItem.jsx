import { FaExternalLinkAlt, FaPlayCircle } from 'react-icons/fa';
import { MdAccessTime, MdOutlineDateRange, MdOutlineQuiz } from "react-icons/md";
import FormUpdate from './Form/FormUpdate';

function TimelineItem({ item, fetchCourse }) {


  return (
    <div className={`timelinecontainer ${item.index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="timelinecontent">
        <div className="timeline-header">
          <h2 className="h2DATE">
            <samp className="samp">
              <samp className="Sampsvg">
                <MdOutlineDateRange />
              </samp>
              {item.date}
            </samp>
            <samp className="samp">
              <samp className="Sampsvg">
                <MdAccessTime />
              </samp>
              {item.time}
            </samp>
          </h2>
        </div>
        <div className="timeline-body">
          <h2><br />{item.title}</h2>
          <p>{item.description}</p>

          <br />


          {item.join_meeting && (<>
            <a href={item.join_meeting} class="no-underline" target="_blank">
              <button className="livebutton">
                <samp className="live-samp">
                  <div className="live-circle"></div>
                  <div className="live-border"></div>
                </samp>
                <samp className="live-text">Join Now</samp>
              </button>
            </a></>
          )}



          {item.Lesson_link && (<>
            <a href={item.Lesson_link} class="no-underline" target="_blank">
              <button className="livebutton">
                <samp className="live-samp">
                  <div className="live-icon" >
                    <FaPlayCircle />
                  </div>  </samp>

                <samp className="live-text">Watch  Lesson </samp>
              </button>
            </a></>
          )}



          {item.material_link && (<>
            <a href={item.material_link} class="no-underline" target="_blank">
              <button className="MaterialLink">
                Go to Material <FaExternalLinkAlt />
              </button>
            </a><br /></>
          )}

          {item.join_Quiz && (<>
            <a href={item.join_Quiz} class="no-underline" target="_blank">
              <button className="MaterialLink">
                Go to Quiz <MdOutlineQuiz />
              </button>
            </a><br /></>
          )}

          {item.Quiz_Coupon && (<>
            <button className="Codebutton">Coupon: {item.Quiz_Coupon}</button><br /></>
          )}

          {item.join_Course && (<>
            <a href={item.join_Course} class="no-underline" target="_blank">
              <button className="MaterialLink">
                Go to Course <MdOutlineQuiz />
              </button>
            </a><br /></>
          )}

          {item.Course_Coupon && (<>
            <button className="Codebutton">Coupon: {item.Course_Coupon}</button><br /></>
          )}


          <div className="Edit" >
            <FormUpdate item_id={item.id} course_id={item.course} fetchCourse={fetchCourse} /></div>












        </div> </div>        </div>

  );
}

export default TimelineItem;












