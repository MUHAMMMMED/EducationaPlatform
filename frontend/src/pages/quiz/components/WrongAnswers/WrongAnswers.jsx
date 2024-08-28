 
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../desing-system/components/Loading';
import './WrongAnswers.css';

const WrongAnswers = () => {
    const [submissions, setSubmissions] = useState([]);
    const { id:examId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                if (!examId) return;
                const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_submission_list/${examId}/` );
                setSubmissions(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchSubmissions();
    }, [examId]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="exam-submissions-container">
            <br />
            <h2 style={{ color: '#d1ae20', fontWeight: 'bold' }}>Wrong Answers</h2>
            <ul className="wrong-answers-list">
                {submissions && submissions.wrong_answers && submissions.wrong_answers.map((answer, index) => (
                    <li key={index}>
                        {answer.question_content && (<p className="question-content">  {answer.question_content}</p>)}
                        {answer.question_image && (
                            <img style={{ width: "100%", border: '1px solid #d1ae20 ', borderRadius: ' 10px' }} src={`${Config.baseURL}${answer.question_image}`} />)}
                        {answer.question_video && (<video autoPlay> <source src={`${Config.baseURL}${answer.question_video}`} type="video/mp4" />
                            <source src="mov_bbb.ogg" type="video/ogg" /></video>)}
                        {answer.question_video_youtube && (
                            <iframe title="Quiz Video" width="100%" height="415" style={{ border: '1px solid #d1ae20 ', borderRadius: ' 10px' }} src={`https://www.youtube.com/embed/${answer.question_video_youtube}?autoplay=1&mute=1`}></iframe>)}
                        <br />
                        <p className='LI'> <p className={`SPan ${answer.correct_option === '1' ? 'correct-option' : ''}`}>A  </p> <samp className='samp-option'>{answer.option_A} </samp></p>
                        <p className='LI'> <p className={`SPan ${answer.correct_option === '2' ? 'correct-option' : ''}`}>B </p><samp className='samp-option'>{answer.option_B}</samp></p>
                        <p className='LI'>  <p className={`SPan ${answer.correct_option === '3' ? 'correct-option' : ''}`}>C </p><samp className='samp-option'>{answer.option_C}</samp></p>
                        <p className='LI'>  <p className={`SPan ${answer.correct_option === '4' ? 'correct-option' : ''}`}>D </p><samp className='samp-option'>{answer.option_D}</samp></p>
                    </li>
                ))}
            </ul>
            <Link to={`/MyQuizzes/${examId}`}><button className='Button' >back</button> </Link>
        </div>
    );
};
export default WrongAnswers;
