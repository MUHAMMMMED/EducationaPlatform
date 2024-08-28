import React from 'react';
import { RiListIndefinite } from "react-icons/ri";
import PointUpdate from './PointUpdate';
export default function PointList( {item,fetchCourse}) {
  return (
    <>
 <div className="Course_cardicon">
 {item && item.point&& item.point.map((pointItem) => (
 <div className="CourseCard" key={pointItem.id} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
 <div className="Course_card_content" style={{ border: '1px solid #ddd;' }}>
 <div>
 <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><RiListIndefinite /></span></div>
 <div style={{ float: 'left' }}>
   <p className="Course_card_title" style={{ textAlign: 'center', fontWeight: '700' }}>{pointItem.title}</p>
 <p className="Course_card_amount" style={{ textAlign: 'center', marginTop: '5px' }}>{pointItem.description}</p>
</div></div>
<div className="Course_cardicon"> 
<PointUpdate item={pointItem} fetchCourse={fetchCourse}  />
 </div>

 </div></div> ))}</div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
