
import { AiOutlineDelete } from 'react-icons/ai';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
const LiveCourseRateDelete = ({ item, fetchCourse }) => {
    
    const handleDelete = async () => {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/live-course-rates/${item.id}/`);
        fetchCourse();
      } catch (error) {
   
      }
    };
 

    return (
<>
     <div style={{ float: 'left', width: '65px' }}>
     <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>
  </>
    );
};

export default LiveCourseRateDelete;

  