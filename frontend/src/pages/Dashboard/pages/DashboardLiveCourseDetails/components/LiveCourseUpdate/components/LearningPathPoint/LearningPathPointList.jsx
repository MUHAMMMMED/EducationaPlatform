 import React from 'react';
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { PiPathBold } from "react-icons/pi";
import PointFormCreate from '../Point/PointCreate';
import PointList from '../Point/PointList';
import LearningPathPointCreate from './LearningPathPointCreate';
import LearningPathPointUpdate from './LearningPathPointUpdate';
 
 export default function LearningPathPointList({liveCourses,fetchCourse}) {
   return (
     <>
 <div className="CourseCard">
 <div className="Course_card_content">
 <div className="Course_card_info">
 <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><PiPathBold /></span></div>
 <div style={{ float: 'left' }}>
 <p className="Course_card_title">LearningPathPoint</p>
 <p className="Course_card_amount"> </p>
 </div> </div>

 <div className="Course_cardicon">
 {liveCourses && liveCourses.base && liveCourses.base.id && (
 <LearningPathPointCreate  BaseId={liveCourses.base.id }  fetchCourse={fetchCourse} /> )}
 </div> </div>

 {liveCourses.base && liveCourses.base.learning_Path.map((item) => (
 <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
 <div className="Course_card_content" style={{ border: '1px solid #ddd;' }}>
 <div>
 <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><BsFillMenuButtonWideFill /></span></div>
 <div style={{ float: 'left' }}>
 <h2 className="Course_card_title" style={{ textAlign: 'center', fontWeight: '700' }}>{item.title}</h2>
  </div> </div>
 <div className="Course_cardicon">
                 
 {item &&  item.id && (
 <PointFormCreate  item={item}  fetchCourse={fetchCourse} />)}
 
 <LearningPathPointUpdate item={item} fetchCourse={fetchCourse} />
 </div> </div>

 
  <PointList item={item}  fetchCourse={fetchCourse} />    
 
 </div>
  ))} </div>  </>
   
 )}
 