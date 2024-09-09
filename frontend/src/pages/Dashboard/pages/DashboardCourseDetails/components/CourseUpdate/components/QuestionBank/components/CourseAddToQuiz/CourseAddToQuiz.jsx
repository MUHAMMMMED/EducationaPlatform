import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../../../../../../../../../config';
import AxiosInstance from '../../../../../../../../../../desing-system/Authentication/AxiosInstance';


export default function CourseAddToQuiz({ questionId, exams, fetchQuiz }) {
  const { id } = useParams();
  const [exam, setExam] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExams = (event) => {
    setExam(event.target.value);
  };

  const sendToQuiz = async () => {
    try {
      setLoading(true);
      if (!id || !exam) return;

      await AxiosInstance.post(`${Config.baseURL}/Courses/add_question_to_episode_quiz/`, {
        exam_id: exam,
        question_id: questionId,
      });
      fetchQuiz();

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Course_card_info">
      <select className="Action-Box" style={{ marginTop: '2px' }} onChange={handleExams} value={exam}>
        <option value=''>Select Exam</option>
        {exams.map(ex => (
          <option value={ex.id} key={ex.id}>{ex.title}</option>
        ))}
      </select>
      <button className='Creat_button' style={{ padding: '16px 20px', marginTop: '1px', marginLeft: '5px' }} onClick={sendToQuiz} disabled={loading}>Add</button>
    </div>
  );
}
