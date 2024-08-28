import React, { useEffect, useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../../../desing-system/components/Loading';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import ExamSubmission from './components/ExamSubmission/ExamSubmission';
import QuestionList from './components/QuestionList/QuestionList';
import QuizDelete from './components/QuizDelete/QuizDelete';
import QuizfaqsList from './components/QuizRevFrequentlyAsked/QuizfaqsList';
import QuizReviewList from './components/QuizReview/QuizReviewList';
import QuizUpdateForm from './components/QuizUpdateForm/QuizUpdateForm';

export default function QuizUpdate() {
 
    const toggleSidebar = () => { setShowSidebar(!showSidebar); };
    const { id: id } = useParams();
    const [quiz, setquiz] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
       
    const fetchQuiz = async () => {
          if (!id) return;
          try {
            const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_operations/${id}/`);
            setquiz(response.data);
          } catch (error) {
            setError(error.response?.data?.error || "You do not have permission to access this data.");
          } finally {
            setLoading(false);
          }
        };
      
        useEffect(() => {
            fetchQuiz();
        }, [id]);
      
 
      
        if (loading) {
          return <Loading />;
        }
      
        if (error) {
          return <ErrorPage head="Error Occurred" error={error} />;
        }
       

  return (
      <>
 <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
 
        <div className="head-flex-container">
        <div><samp> <button className="ButtonSidebar" onClick={toggleSidebar}> = </button></samp> Dashboard </div>
        <div>  {quiz.title} </div>{quiz &&quiz.id&& <QuizDelete quiz={quiz} /> }   </div>  
        
        <div className="CourseCard" style={{  width:'100%', border:'0px solid #58a58f', boxShadow:'none'}}>
        <div className="form-container-half"  >
        <Link to={`/dashboard_Quiz/${quiz.id}`}> <span className='onLine-icon' ><IoIosArrowBack /></span> </Link> 
        </div></div>
 

        <div className="CourseCard"> 
        <div className="Course_card_content">
           <div className="Course_card_info">
        <div style={{ float:'left', width: '65px' }}><span className='onLine-icon'><GrUpdate /></span></div>
        <div style={{ float:'left' }}>
        <p className="Course_card_title">Quiz</p>
        <p className="Course_card_amount">Update </p></div> </div>
        <div className="Course_cardicon">
        {quiz &&quiz.id&& <QuizUpdateForm quiz={quiz} /> }</div></div></div>   
        {quiz&&quiz.question&& <QuestionList quiz={quiz} fetchQuiz={fetchQuiz}/>}
        {quiz&&<QuizReviewList quiz={quiz} fetchQuiz={fetchQuiz}/>}  
        {quiz&& <QuizfaqsList quiz={quiz} fetchQuiz={fetchQuiz}/>}
        {quiz&&quiz.submission&& <ExamSubmission quiz={quiz} fetchQuiz={fetchQuiz} />}
  </>
  )
}




 