 
import React, { useState } from 'react';
import { LiaQuestionSolid } from "react-icons/lia";
import { TbMessage2Question } from "react-icons/tb";
import { Link } from 'react-router-dom';
import Config from '../../../../../../../../../config';
import QuestionUpdate from '../../../../../../DashboardQuizDetails/components/QuestionBank/components/AddQuestion/QuestionForm/QuestionUpdate';
import QuestionDelete from '../../Questions/QuestionList/QuestionDelete';
import './QuestionList.css';

const QuestionList = ({questions,Course,quizId,fetchQuestions}) => {
  const [displayCount, setDisplayCount] = useState(0);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5); // Increase count by 5 when the button is clicked
  };

 return (
<div className="CourseCard"  style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
<div className="Course_card_content">
<div className="Course_card_info">
<div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><TbMessage2Question /></span></div>
<div style={{ float: 'left' }}>
<p className="Course_card_title">Question</p>
<p className="Course_card_amount">Question  </p></div> </div>
<div className="Course_cardicon">
{Course&&Course.author&& <Link to={`/CourseQuestionBank/${Course.author}`}>  <button class="Creat_button">Question Bank</button> </Link>} 
 
</div></div> 
{questions.slice(0, displayCount).map((item, index) => (
 
<div className="CourseCard" key={index} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
<div className="Course_card_content">
<div className="Course_card_info">
<div style={{ float: 'left', width: '65px' }}>
  <span className='onLine-icon'><LiaQuestionSolid /></span></div>
<div style={{ float: 'left' }}>
<p className="Course_card_title">Question</p>
<p className="Course_card_amount"> </p></div> </div>
<div className="Course_cardicon"></div>
  {item &&item.id&&<QuestionDelete item={item} quizId={quizId} fetchQuiz={fetchQuestions} />}  
   
</div>
  
<ul className="wrong-answers-list">
 <li >
 {item.question_content && (<p className="question-content">  {item.question_content}</p>)}
 {item.question_image && (
<img style={{ width: "100%", border: '1px solid #d1ae20 ', borderRadius: ' 10px' }} src={`${Config.baseURL}${item.question_image}`} />)}
{item.question_video && (<video autoPlay> <source src={`${Config.baseURL}${item.question_video}`} type="video/mp4" />
<source src="mov_bbb.ogg" type="video/ogg" /></video>)}
 {item.question_video_youtube && (
 <iframe title="Quiz Video" width="100%" height="415" style={{ border: '1px solid #d1ae20 ', borderRadius: ' 10px' }} src={`https://www.youtube.com/embed/${item.question_video_youtube}?autoplay=1&mute=1`}></iframe>)}
<br />
 <p className='Li'> <p className={`SPAN ${item.correct_option === '1' ? 'correct-option' : ''}`}>A  </p> <samp className='samp-option'>{item.option_A} </samp></p>
 <p className='Li'> <p className={`SPAN ${item.correct_option === '2' ? 'correct-option' : ''}`}>B </p><samp className='samp-option'>{item.option_B}</samp></p>
<p className='Li'>  <p className={`SPAN ${item.correct_option === '3' ? 'correct-option' : ''}`}>C </p><samp className='samp-option'>{item.option_C}</samp></p>
 <p className='Li'>  <p className={`SPAN ${item.correct_option === '4' ? 'correct-option' : ''}`}>D </p><samp className='samp-option'>{item.option_D}</samp></p>
</li></ul> <br/><br/>
  
 <div className="CourseCard"  style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '0px solid #ddd ' }}>
 <div className="Course_card_content">

 {item &&item.id&&<QuestionUpdate Item={item} fetchQuestions={fetchQuestions} />}  
 </div> </div>  </div>  

))} 
 
<div className="Course_card_info"style={{alignItems:"center"}}>
  <div className="Course_cardicon" style={{width:'60%'}}>
  {questions.length > displayCount &&
  <button  className='Open_button' onClick={handleShowMore}>Show Question</button>
} 
 </div></div>
 
</div>  
 );
};
export default QuestionList;


 