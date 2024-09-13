
import { LiaQuestionSolid } from "react-icons/lia";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { TbMessage2Question } from "react-icons/tb";
import Config from '../../../../../../../../config';
import QuestionDelete from '../../../QuizUpdate/components/QuestionList/QuestionDelete';
import QuestionForm from '../AddQuestion/QuestionForm/QuestionForm';
import QuestionUpdate from '../AddQuestion/QuestionForm/QuestionUpdate';
import AddToQuiz from '../AddToQuiz/AddToQuiz ';
import './QuestionList.css';

const QuestionList = ({ data, exams, creator, fetchQuestions }) => {

    return (
        <div className="CourseCard" style={{ border: '0px solid #58a58f', boxShadow: 'none' }}>
            <div className="Course_card_content">
                <div className="Course_card_info">
                    <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><TbMessage2Question /></span></div>
                    <div style={{ float: 'left' }}>
                        <p className="Course_card_title">Question</p>
                        <p className="Course_card_amount">Question  </p></div> </div>
                <div className="Course_cardicon">
                    {creator && <QuestionForm data={data} creator={creator} fetchQuestions={fetchQuestions} />}</div></div>

            {data.questions && data.questions.map((item, index) => (
                <div className="CourseCard" key={index} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
                    <div className="Course_card_content">
                        <div className="Course_card_info">
                            <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><LiaQuestionSolid /></span></div>
                            <div style={{ float: 'left' }}>
                                <p className="Course_card_title">Question</p>
                                <p className="Course_card_amount"> {item.category.title}</p></div> </div>
                        <div className="Course_cardicon"></div>
                        {item && item.id && <QuestionUpdate Item={item} data={data} fetchQuestions={fetchQuestions} />}</div>

                    <ul className="wrong-answers-list">
                        <li >
                            {item.question_content && (<p className="question-content">  {item.question_content}</p>)}
                            {item.question_image && (
                                <img style={{ width: "100%", border: '1px solid #d1ae20 ', borderRadius: ' 10px' }} src={`${Config.baseURL}${item.question_image}`} />)}
                            {item.question_video && (<video autoPlay> <source src={`${Config.mediaURL}${item.question_video}`} type="video/mp4" />
                                <source src="mov_bbb.ogg" type="video/ogg" /></video>)}
                            {item.question_video_youtube && (
                                <iframe title="Quiz Video" width="100%" height="415" style={{ border: '1px solid #d1ae20 ', borderRadius: ' 10px' }} src={`https://www.youtube.com/embed/${item.question_video_youtube}?autoplay=1&mute=1`}></iframe>)}
                            <br />
                            <p className='Li'> <p className={`SPAN ${item.correct_option === '1' ? 'correct-option' : ''}`}>A  </p> <samp className='samp-option'>{item.option_A} </samp></p>
                            <p className='Li'> <p className={`SPAN ${item.correct_option === '2' ? 'correct-option' : ''}`}>B </p><samp className='samp-option'>{item.option_B}</samp></p>
                            <p className='Li'>  <p className={`SPAN ${item.correct_option === '3' ? 'correct-option' : ''}`}>C </p><samp className='samp-option'>{item.option_C}</samp></p>
                            <p className='Li'>  <p className={`SPAN ${item.correct_option === '4' ? 'correct-option' : ''}`}>D </p><samp className='samp-option'>{item.option_D}</samp></p>
                        </li></ul>

                    <div className="CourseCard" style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
                        <div className="Course_card_content">
                            <div className="Course_card_info">
                                <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><MdOutlineAddToPhotos /></span></div>
                                <div style={{ float: 'left' }}>
                                    <p className="Course_card_title">Question</p>
                                    <p className="Course_card_amount">Add Question To Exams </p></div> </div>
                            <div className="Course_cardicon">
                                {item.id && exams && <AddToQuiz questionId={item.id} exams={exams} fetchQuiz={fetchQuestions} />}
                            </div></div>

                        {item && item.exams && item.exams.map((exam, index) => (
                            <div className="CourseCard" key={index} style={{ width: '100%', marginLeft: '0', marginTop: '1', border: '1px solid #ddd;' }}>
                                <div className="Course_card_content">
                                    <div className="Course_card_info">
                                        <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><TbMessage2Question /></span></div>
                                        <div style={{ float: 'left' }}>
                                            <p className="Course_card_title"> {exam.exam_title}</p>
                                            <p className="Course_card_amount">
                                                {/* Question Count : */}
                                            </p></div> </div>
                                    <div className="Course_cardicon">
                                        {item.id && exam.exam_id && <QuestionDelete item={item} quizId={exam.exam_id} fetchQuiz={fetchQuestions} />}
                                    </div> </div></div>))}</div> </div>
            ))} </div>
    );
};
export default QuestionList;
