import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const LiveCourseDelete = ({ liveCourseId }) => {
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);


  const deleteCourse = async () => {
    try {

      await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/live-courses/${liveCourseId}/`)
      navigate('/dashboard_LiveCourse');

    } catch (error) {
      console.error('Error deleting LiveCourses:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalDelete(false);
  };

  return (
    <>
      <span className='onLine-icon' onClick={() => setShowModalDelete(true)}><AiOutlineDelete /></span>
      <div className={`modal ${showModalDelete ? 'show' : ''}`}>
        <div className="modal-content animate">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Delete Live Course</h2>
          <div>
            <p style={{ marginBottom: '45px', marginTop: '30px' }}>Are you sure you want to delete this live course?</p>
            <div className="FOrmContainer">
              <div style={{ width: '78%' }}>
                <button className="button-form" onClick={deleteCourse}>Delete</button>
              </div>
              <div style={{ width: '20%' }}>
                <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveCourseDelete;
