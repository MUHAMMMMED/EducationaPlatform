import React from 'react';
import { PiVideoLight } from "react-icons/pi";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import EpisodeCreate from '../Episodes/EpisodeCreate';
import EpisodesList from '../Episodes/EpisodesList';
import SectionsCreate from './SectionsCreate';
import SectionsUpdate from './SectionsUpdate';

 export default function SectionsList({Course,fetchCourse}) {
   return (
     <>
 <div className="CourseCard">
 <div className="Course_card_content">
 <div className="Course_card_info">
 <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><PiVideoLight /></span></div>
 <div style={{ float: 'left' }}>
 <p className="Course_card_title">Section</p>
 <p className="Course_card_amount"> </p>
 </div> </div>

 <div className="Course_cardicon">
 {Course && Course.id && (
 <SectionsCreate  Course={Course }  fetchCourse={fetchCourse} /> )}  
 </div> </div>

 {/* {Course &&  Course.course_sections&&  Course.course_sections.map((item) => ( */}


{Course && Course.course_sections && Course.course_sections
  .sort((a, b) => a.section_number - b.section_number) // Sort course sections by section_number
  .map((item) => (
 
 <div className="CourseCard" key={item.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
 <div className="Course_card_content" style={{ border: '1px solid #ddd;' }}>
 <div>
 <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><TfiLayoutAccordionList /></span></div>
 <div style={{ float: 'left' }}>
 <h2 className="Course_card_title" style={{ textAlign: 'center', fontWeight: '700' }}><samp style={{background:'#58a58f',color:'#fff' ,padding:' 5px 10px', borderRadius:'5px',fontSize:'15px', marginRight:'5px'}}>
  {item.section_number}</samp>{item.title} </h2>
 <p className="Course_card_amount"> {item.description} </p>
 </div> </div>
 <div className="Course_cardicon">
<EpisodeCreate item={item} Course={Course}fetchCourse={fetchCourse}  />  
<SectionsUpdate item={item} fetchCourse={fetchCourse} />   
 </div> </div>

 
 <EpisodesList item={item}   Course={Course}  fetchCourse={fetchCourse} />      
 
 </div>
  ))} </div>  </>
   
 )}
 