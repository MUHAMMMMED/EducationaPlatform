import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function LearningPathPointCreate({ BaseId, fetchCourse }) {
  const [showModalPathCreate, setShowModalPathCreate] = useState(false);
  const [formData, setFormData] = useState({
    base: BaseId ,
    title: '',
    point: ''
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/learning-path-points/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalPathCreate(false);
      fetchCourse();
      // Clear the form fields after successful submission
      setFormData({ base:BaseId,title: '',   });
    } catch (error) {
     
    }
  };

  const handleCloseModal = () => {
    setShowModalPathCreate(false);
  };

  // Check if BaseId is null and fetch the course if it is
  if (BaseId === null) {
    fetchCourse();
  }

  return (
    <>
      <button onClick={() => setShowModalPathCreate(true)} className="Creat_button">Create</button>
      <div className={`modal ${showModalPathCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Learning Path Point Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>  </div> 
          {/* Form buttons */}
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
