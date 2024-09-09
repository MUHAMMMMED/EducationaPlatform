
import React, { useEffect, useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import QuestionForm from "./components/QuestionForm/QuestionForm";

const AddQuestion = () => {
  const [showModalAddQuestion, setShowModalAddQuestion] = useState(false);
  const handleCloseModal = () => { setShowModalAddQuestion(false); };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/question_list/`);

      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };





  return (
    <>
      <button className="Creat_button" onClick={() => setShowModalAddQuestion(true)}>add</button>

      <div className={`modal ${showModalAddQuestion ? 'show' : ''}`}>
        <div className="modal-content animate">



          <div className="FOrm-container">
            <div className="form-container-half">
              <h2 style={{ textAlign: 'left', padding: '15px' }}>Add Question</h2></div>

            <div className="form-container-half" style={{ width: '100px' }}>
              <span className='Delete-icon' onClick={handleCloseModal}><ImCancelCircle /></span>

            </div>
          </div>
          <QuestionForm />

          <div>
            <h1>Question List</h1>
            <ul>
              {questions.map(question => (
                <li key={question.id}>{question.question_content}</li>

              ))}
            </ul>
          </div>
        </div>  </div>

    </>
  );
};

export default AddQuestion;

