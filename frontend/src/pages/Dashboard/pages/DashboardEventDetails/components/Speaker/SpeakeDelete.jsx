import React from 'react';
 
import { AiOutlineDelete } from 'react-icons/ai';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
export default function SpeakeDelete({speakerId,fetchEvent}) {

  const handleDelete = async () => {
    try {
     
      await AxiosInstance.delete(`${Config.baseURL}/Event/speaker/${speakerId}/`);
      // Assuming fetchEvent fetches the updated list of speakers
      fetchEvent();
    } catch (error) {
      console.error('Error deleting speaker:', error);
    }
  };

  return (
    <>
            <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>
 
     </>
  )
}
 