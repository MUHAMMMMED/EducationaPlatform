
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';

export default function Delete({ItemId,fetchCourse }) {
 
  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/reply/delete/${ItemId}/`);
      fetchCourse();
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  return (
  <>  <button className="post-button" onClick={handleDelete}>Delete</button>  </> 
  )
}
