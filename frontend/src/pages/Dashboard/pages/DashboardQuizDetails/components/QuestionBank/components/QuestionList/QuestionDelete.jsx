
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

import { AiOutlineDelete } from 'react-icons/ai';
const QuestionDelete = ({ item, quizId, fetchQuiz }) => {

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Quiz/delete_questions_from_exam/${quizId}/${item.id}/`);
      fetchQuiz();
    } catch (error) {

    }
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px' }}><span className='Delete-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>
    </>
  );
};

export default QuestionDelete;

