
import Config from '../../../../../../../config';
import AxiosInstance from '../../../../../../../desing-system/Authentication/AxiosInstance';

import { AiOutlineDelete } from 'react-icons/ai';
const TeamDelete = ({ item, fetchDate }) => {

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/home/team/${item.id}/`);
      fetchDate();
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

export default TeamDelete;

