import React from 'react';
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { RiListIndefinite } from "react-icons/ri";
import CourseDefinitionCreate from './CourseDefinitionCreate';
import CourseDefinitionUpdate from './CourseDefinitionUpdate';
export default function CourseDefinitionList({ liveCourses, fetchCourse }) {
  return (
    <>
      <div className="CourseCard">
        <div className="Course_card_content">
          <div className="Course_card_info">
            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><BsFillMenuButtonWideFill /></span></div>
            <div style={{ float: 'left' }}>
              <p className="Course_card_title">CourseDefinition</p>
              <p className="Course_card_amount"> </p>
            </div>
          </div>
          <div className="Course_cardicon">
            {liveCourses && liveCourses.base && liveCourses.base.id && (
              <CourseDefinitionCreate BaseId={liveCourses.base.id} fetchCourse={fetchCourse} />
            )}
          </div>
        </div>
        {liveCourses.base && liveCourses.base.definition.map((item) => (
          <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
            <div className="Course_card_content" style={{ border: '1px solid #ddd;' }}>
              <div>
                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><RiListIndefinite /></span></div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title" style={{ textAlign: 'center', fontWeight: '700' }}>{item.title}</p>
                  <p className="Course_card_amount" style={{ textAlign: 'center', marginTop: '5px' }}>{item.description}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                {item && item.id && (<CourseDefinitionUpdate definition={item} fetchCourse={fetchCourse} />)}
              </div>
            </div>
          </div>
        ))}
      </div>



    </>
  )
}
