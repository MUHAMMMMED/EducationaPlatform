import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function QuizCreate({ Course, fetchCourse }) {
  const [showModalSectionCreate, setShowModalSectionCreate] = useState(false);
  const [formData, setFormData] = useState({

    course: Course.id,
    title: '',
    description: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Courses/episode_quiz/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalSectionCreate(false);
      fetchCourse();
      // Clear the form fields after successful submission
      setFormData({ course: Course.id, title: '', description: '', });



    } catch (error) {

    }
  };

  const handleCloseModal = () => {
    setShowModalSectionCreate(false);
  };


  if (Course === null) {
    fetchCourse();
  }

  return (
    <>
      <button onClick={() => setShowModalSectionCreate(true)} className="Creat_button">Create</button>
      <div className={`modal ${showModalSectionCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Quiz Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }} >
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div>

          <label className='label' htmlFor="description" style={{ width: '100%' }}>Description:</label>
          <input type="text" name="description" style={{ height: '100px' }} value={formData.description} onChange={handleChange} placeholder="description" />

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
