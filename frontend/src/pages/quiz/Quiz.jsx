import React, { useEffect, useRef, useState } from 'react';
import { GrDocumentTime, GrScorecard } from "react-icons/gr";
import { Link, useParams } from 'react-router-dom';
import './Quiz.css';
import { Button, ButtonBack, Containerq, H2, H4, Head, Iframe, Img, Index, LIButton, Q_LI, Ques, Result, Row, SPan, Time, UL } from './styles';

import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import img from './Quiz.jpg';
import countdown from './countdown.mp3';
import lose from './lose.mp3';
import win from './win.mp3';

const QuizComponent = () => {
  const { id: examId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [time, setTime] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [timer, setTimer] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const optionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const fetchExamQuiz = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_quiz/${examId}/`);
        setQuizData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "The Quiz is currently unavailable or requires purchasing a retest");
      } finally {
        setLoading(false);
      }
    };
    fetchExamQuiz();
  }, [examId]);

  useEffect(() => {
    let timer;
    if (!lock && quizData && currentQuestionIndex < quizData.questions.length) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lock, currentQuestionIndex, quizData]);

  useEffect(() => {
    if (quizData && time >= quizData.exam.time_to_answer) {
      setLock(true);
      clearInterval(timer);
      setResult(true);
      submitExam();
    } else if (quizData && quizData.exam.time_to_answer - time === 5 && userInteracted) {
      if (countdown) {
        playAudio(countdown);
      }
    }
  }, [time, quizData, userInteracted]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  };

  const checkAns = (ans) => {
    if (!lock) {
      const currentQuestion = quizData.questions[currentQuestionIndex];
      const Current = parseInt(currentQuestion.correct_option);
      const targetRef = optionRefs[ans - 1];
      if (targetRef && targetRef.current) {
        targetRef.current.classList.add(ans === Current ? 'correct' : 'wrong');
        if (ans === Current) {
          setLock(true);
          setScore(score + 1);
          if (win && userInteracted) {
            playAudio(win);
          }
        } else {
          optionRefs[Current - 1]?.current.classList.add('correct');
          setLock(true);
          if (lose && userInteracted) {
            playAudio(lose);
            setWrongAnswers([...wrongAnswers, currentQuestion]);
          }
        }
      }
    }
  };

  const handleAnswerClick = (index) => () => {
    if (!lock) {
      checkAns(index);
    }
  };

  const handleNextQuestion = () => {
    if (lock) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setLock(false);
      optionRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.classList.remove('correct', 'wrong', 'question_p');
        }
      });
      if (currentQuestionIndex + 1 === quizData.questions.length) {
        setResult(true);
        submitExam();
      }
    } else {
      setResult(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };

  const submitExam = async () => {
    try {
      const submissionData = {
        exam: quizData.exam.id,
        score: score,
        time_taking: time,
        wrong_answers: wrongAnswers.map((question) => question.id),
      };
      AxiosInstance.post(`${Config.baseURL}/Quiz/exam_submissions/`, submissionData);
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  const { exam, questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className='Container' onClick={handleUserInteraction}>
        {result ? (
          <Containerq style={{ backgroundImage: `url(${img})` }}>
            <Result>
              <div className="Completed">Quiz Completed</div>
              <div className="score">
                <span className='span_icon'><GrScorecard /></span>
                You scored {score} out of {questions.length}
              </div>
              <div className="time">
                <span className='span_icon'><GrDocumentTime /></span>
                Total Time Taken: {formatTime(time)}
              </div>
              <p className='tries'>You have <samp className='tries_number'>{quizData.triesuser}</samp> tries</p>
              <br />
              <Link to={`/MyQuizzes/${quizData.title}/${examId}`}><ButtonBack>Back</ButtonBack></Link>
              {quizData.triesuser !== 0 && <a href={`/Quiz/${examId}`}> <ButtonBack>Start Quiz Again</ButtonBack></a>}
              {exam.WrongAnswers ? <Link to={`/WrongAnswers/${examId}`}><ButtonBack>View Wrong Answers</ButtonBack></Link> : null}
            </Result>
          </Containerq>
        ) : (
          <Containerq style={{ backgroundImage: `url(${img})` }}>
            <Head>
              <Row><H4>{exam.title}</H4></Row>
              <Row style={{ width: "30%" }}><Time>{`Time Taken: ${formatTime(time)}`}</Time></Row>
            </Head>
            {currentQuestion ? (
              <div>
                <Ques>
                  {currentQuestion?.question_content && <H2>{currentQuestion.index}. {currentQuestion?.question_content}</H2>}
                  {currentQuestion?.question_image && <Img src={`${Config.mediaURL}${currentQuestion?.question_image}`} />}
                  {/* {currentQuestion?.question_video && (
                    <Video autoPlay>
                      <source src={`${Config.mediaURL}${currentQuestion?.question_video}`} type="video/mp4" />
                      <source src="mov_bbb.ogg" type="video/ogg" />
                    </Video>
                  )} */}
                  {currentQuestion.question_video_youtube && (
                    <Iframe title="Quiz Video" src={`https://www.youtube.com/embed/${currentQuestion?.question_video_youtube}?autoplay=1&mute=1`}></Iframe>
                  )}
                </Ques>
                <UL>
                  <Q_LI onClick={handleAnswerClick(1)} ref={optionRefs[0]}><SPan>A</SPan><p className='question_p'>{currentQuestion.option_A}</p></Q_LI>
                  <Q_LI onClick={handleAnswerClick(2)} ref={optionRefs[1]}><SPan>B</SPan><p className='question_p'>{currentQuestion.option_B}</p></Q_LI>
                  <Q_LI onClick={handleAnswerClick(3)} ref={optionRefs[2]}><SPan>C</SPan><p className='question_p'>{currentQuestion.option_C}</p></Q_LI>
                  <Q_LI onClick={handleAnswerClick(4)} ref={optionRefs[3]}><SPan>D</SPan><p className='question_p'>{currentQuestion.option_D}</p></Q_LI>
                </UL>
                <LIButton>
                  <Button onClick={handleNextQuestion}>Next Question</Button>
                </LIButton>
                <br />
                <Index>{currentQuestion.index} of {questions.length} questions</Index>
              </div>
            ) : null}
          </Containerq>
        )}
      </div>
    </>
  );
};

export default QuizComponent;
