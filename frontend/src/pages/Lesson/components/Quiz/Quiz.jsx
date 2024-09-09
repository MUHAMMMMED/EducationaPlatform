import React, { useEffect, useRef, useState } from 'react';
import Config from '../../../../config';
import './Quiz.css';
import img from './Quiz.jpg';
import lose from './lose.mp3';
import { Button, Buttonqiuz, CenterBut, Con, Container, H2, Iframe, Img, Index, LI, SPan, UL, Video } from './styles';
import win from './win.mp3';


export default function Quiz({ data }) {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(null);
  const optionRefs = useRef([]);
  const Current = parseInt(question?.correct_option);
  const handleLock = () => {
    setLock(false);
    setResult(false);
  };

  useEffect(() => {
    handleLock();
  }, []);

  useEffect(() => {
    if (data && data.exam && data.exam.questions && data.exam.questions.length > 0) {
      setQuestion(data.exam.questions[index]);
    }
  }, [index, data]);

  const handleAnswerClick = (index) => (e) => {
    e.stopPropagation();
    checkAns(e, index + 1);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      const targetRef = optionRefs.current[ans - 1];
      if (targetRef) {
        targetRef.classList.add(ans === Current ? 'correct' : 'wrong');
        if (ans === Current) {
          setLock(true);
          const audio = new Audio(win);
          audio.play();
        } else {
          optionRefs.current[Current - 1]?.classList.add('correct');
          setLock(true);
          const audio = new Audio(lose);
          audio.play();
        }
      }
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = index + 1;
    if (lock && nextIndex < data.exam.questions.length) {
      setIndex(nextIndex);
      setLock(false);
      setResult(false);

      optionRefs.current.forEach((ref) => {
        ref.classList.remove('correct', 'wrong', 'question_p');
      });
    } else if (lock) {
      setResult(true);
    }
  };

  if (!data || !data.exam) {
    return null;
  }

  return (
    <>
      {result ? (
        <CenterBut>
          <Buttonqiuz onClick={handleLock}><span style={{ margin: ' 5px' }}>Start Quiz</span></Buttonqiuz>
        </CenterBut>
      ) : (
        <Container style={{ backgroundImage: `url(${img})` }}>
          {question ? (
            <>
              <div style={{ display: 'flex', padding: '0px', margin: '0' }}>
                <h2 style={{ textAlign: 'left', width: '100%', color: '#fff', fontSize: '25px', marginTop: '10px', marginLeft: '15px' }}>Start Quiz</h2>
              </div>
              <>
                <Con>
                  {question.question_content && <H2>{index + 1}. {question.question_content}</H2>}
                  {question.question_image && <Img src={`${Config.baseURL}${question.question_image}`} />}
                  {question.question_video && <Video autoPlay><source src={`${Config.baseURL}${question.question_video}`} type="video/mp4" /><source src="mov_bbb.ogg" type="video/ogg" /></Video>}
                  {question.question_video_youtube && <Iframe title="Quiz Video" src={`https://www.youtube.com/embed/${question.question_video_youtube}?autoplay=1&mute=1`} />}
                  <UL>
                    <LI onClick={handleAnswerClick(0)} ref={(ref) => optionRefs.current[0] = ref}>
                      <SPan>A</SPan><p className='question_p'>{question.option_A}</p>
                    </LI>
                    <LI onClick={handleAnswerClick(1)} ref={(ref) => optionRefs.current[1] = ref}>
                      <SPan>B</SPan><p className='question_p'>{question.option_B}</p>
                    </LI>
                    <LI onClick={handleAnswerClick(2)} ref={(ref) => optionRefs.current[2] = ref}>
                      <SPan>C</SPan> <p className='question_p'>{question.option_C}</p>
                    </LI>
                    <LI onClick={handleAnswerClick(3)} ref={(ref) => optionRefs.current[3] = ref}>
                      <SPan>D</SPan> <p className='question_p'>{question.option_D}</p>
                    </LI>
                  </UL>
                  <Button onClick={handleNextQuestion}>Next</Button>
                  <Index>{index + 1} of {data.exam.questions.length} questions</Index>
                </Con>
              </>
            </>
          ) : (
            <CenterBut>
              <Buttonqiuz onClick={handleLock}><span style={{ margin: '-5px' }}>Start Quiz</span></Buttonqiuz>
            </CenterBut>
          )}
        </Container>
      )}
    </>
  );
};
