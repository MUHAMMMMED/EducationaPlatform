
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

import { AiOutlineDelete } from 'react-icons/ai';
const ExamSubmissionDelete = ({ item, fetchQuiz }) => {

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Quiz/exam_submission_delete/${item.id}/`);
      fetchQuiz();
    } catch (error) {

    }
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>
    </>
  );
};

export default ExamSubmissionDelete;

