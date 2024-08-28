
import React, { useState } from 'react';
import { AiOutlinePartition } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import Config from '../../../../../../config';
import SupporterCreate from './components/Form/SupporterCreate';
import SupporterDelete from './components/Form/SupporterDelete';

export default function Supporters({date,fetchDate}) {
  const [displayCount, setDisplayCount] = useState(1);

  const handleDisplayMore = () => {
    setDisplayCount(prevCount => prevCount + 10);
  };
  return (
     
 <div className="CourseCard" style={{marginBottom:'15px'}}>
 <div className="Course_card_content">
 <div className="Course_card_info">
 <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><AiOutlinePartition  /></span></div>
 <div style={{ float: 'left' }}>
 <p className="Course_card_title"> Supporters</p>
 <p className="Course_card_amount">  </p>
 </div>
 </div>
 <div className="Course_cardicon">
 <SupporterCreate   fetchDate={fetchDate}/> 
 </div> </div>
 {date && date.supporters&& date.supporters.slice(0, displayCount).map((item) => (
 <div className="CourseCard"  key={item.id}  style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
 <div className="Course_card_content">
 <div className="Course_card_info">
   <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><CiImageOn /></span></div>
 <div style={{ float: 'left' }}><p className="Course_card_title">  
 
 {item.image &&<img src={`${Config.baseURL}${item.image}`}  width={'100%'} alt="slide" />}
 
 </p>
</div></div>

 
 <div className="Course_cardicon">
 {item &&item.id && <SupporterDelete item={item} fetchDate={fetchDate} /> }  
 </div></div> </div> ))}
 <div className="Course_card_info"style={{alignItems:"center"}}>
  <div className="Course_cardicon" style={{width:'60%'}}>
  {date && date.supporters&& date.supporters.length > displayCount && ( <button className='Open_button' onClick={handleDisplayMore}>Load More</button> )}
 </div></div>   
 </div>
 
  )
}







  