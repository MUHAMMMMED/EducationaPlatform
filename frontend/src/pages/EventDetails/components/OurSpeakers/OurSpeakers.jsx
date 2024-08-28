import React from 'react';
import Config from '../../../../config';
import './styles.css';

export default function OurSpeakers({event}) {
  return (
    <>

 <div class="entry-content" style={{marginBottom:'50px'}}>
 <h5 class="fontMedium ">OurSpeakers</h5>
 {event.speaker.map(item => (
 <div class="Speaker_item" key={item.id}>
 <div class="image d-flex align-items-center justify-content-center">
 <div class="Speaker_image-wrapper">
{item.image && (  
<img  className='Speaker_image_wrapper_img'  src={`${Config.baseURL}${item.image}`} alt= {item.name} /> )}
 </div> </div>
 <h3 class="Speaker_name">{item.name}</h3> 
 <div class="Speaker_job">{item.info}</div>
 </div> ))}
 
 <div class="Speaker_item" style={{width:'100%',height:'50px'}} /><br/> </div>
 </>)
}
