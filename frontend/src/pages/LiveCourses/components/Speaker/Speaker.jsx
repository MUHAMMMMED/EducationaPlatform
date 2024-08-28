import React from 'react';
import Config from '../../../../config';
import { CourseSpeakers } from './styles';
import './styles.css'; // Import the CSS file

export default function Speaker({data}) {
  return (
<CourseSpeakers>
 

<section className="SectionSpeaker">
 {/* <h2 class="content_details_item_title">Course Instructors</h2> */}
 
    <div className=" ">
    <div className="row_speaker">
      <div className="row_speaker_col ">
      <div class="  image_widget">
      {data.Base.author_Image && (  <img className='image_widget_img' src={`${Config.baseURL}/${data.Base.author_Image}`} alt={data.Base.title_Speaker}/>)} </div></div>
      
      <div class="row_speaker_col" >
      <div class="row_details_content ">
      <h3 class="Mentor_name">{data.Base.author_Title}</h3>
      <h4 class="Mentor_designation" style={{lineHeight: '2' }}>{data.Base.job_title}</h4>
      <p style={{lineHeight: '2' }}> {data.Base.author_Description1} </p>
      <p style={{lineHeight: '2' }}>  {data.Base.author_Description2}</p>
      <p style={{lineHeight: '2' }}> {data.Base.author_Description3}</p> 

</div> </div> 

 <div class="row_speaker_col_details" style={{marginTop:'50px'}} >
<div class="Counter_item ">
<h3 class="Counter_value">
<span class="counter_value_text">{data.Base.Number_Achievements_Hour}</span><span>+</span></h3>
<p class="Counter_p">{data.Base. Title_Achievements_Hour}</p></div>
<div class="Counter_item  ">
<h3 class="Counter_value">
<span class="counter_value_text">{data.Base.Number_Achievements_Book}  </span> <span>+</span></h3>
<p class="Counter_p">{data.Base.Title_Achievements_Book}</p></div>
<div class="Counter_item  ">
<h3 class="Counter_value"><span class="counter_value_text"> {data.Base.Number_Achievements_Grade}  </span>
<span>+</span></h3><p class="Counter_p">{data.Base.Title_Achievements_Grade}  </p></div></div>

</div>
<div style={{marginBottom:'15px'}}></div>

{data && data.Base.speaker && (
 <div class="mentor_row_speaker"  >
     {data&&data.Base.speaker.map((item) => (  
     <div class="col col-lg-4" key={item.id}>
     <div class="mentor_item">
     <div class="mentor_image">  {item.Teacher.height_image && (
     <img style={{width:'100%'}}  src={`${Config.baseURL}/${item.Teacher.height_image}`} alt={item.Teacher.user_full_name}  />)}</div>
     <div class="mentor_content">
     <div class="Mentor_Name"> {item.Teacher.user_full_name}</div>
     <p class="Mentor_designation"style={{lineHeight: '2' }}>{item.description}</p>

     <div style={{marginBottom:'15px'}}></div>
     </div></div>
    </div>  
    ))}  
    </div>
    )}
    
    </div></section>
 
</CourseSpeakers>
  )
}
 