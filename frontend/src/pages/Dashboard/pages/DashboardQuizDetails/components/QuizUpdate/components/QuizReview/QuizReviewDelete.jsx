
import { AiOutlineDelete } from 'react-icons/ai';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
const QuizReviewDelete = ({ item, fetchQuiz }) => {
    
    const handleDelete = async () => {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/Quiz/review_list/${item.id}/`);
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

export default QuizReviewDelete;

  