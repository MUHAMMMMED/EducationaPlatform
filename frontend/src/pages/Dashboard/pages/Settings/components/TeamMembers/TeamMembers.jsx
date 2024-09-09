
import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa6";
import TeamCreate from './components/TeamCreate';
import TeamDelete from './components/TeamDelete';


export default function TeamMembers({ date, fetchDate }) {
  const [displayCount, setDisplayCount] = useState(1);
  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };

  return (
    <>

      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><FaRegUser /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title"> Team Members </p>
              <p className="Course_card_amount">  </p>
            </div>
          </div>
          <div className="Course_cardicon">
            {date && date.user && <TeamCreate user={date.teacher} fetchDate={fetchDate} />}
          </div>
        </div>
        {date && date.team && date.team.slice(0, displayCount).map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><FaRegUser />
                </span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">  {item.teacher?.user_full_name}   </p>
                  <p className="Course_card_title"> {item.teacher?.job_title}  </p>

                </div></div>
              <div className="Course_cardicon">
                {item && item.id && <TeamDelete item={item} fetchDate={fetchDate} />}

              </div></div> </div>

        ))}

        <div className="Course_card_info" style={{ alignItems: "center" }}>
          <div className="Course_cardicon" style={{ width: '60%' }}>
            {date && date.team && date.team.length > displayCount && (<button className='Open_button' onClick={handleDisplayMore}>Load More</button>)}
          </div></div>
      </div>
    </>
  )
}
