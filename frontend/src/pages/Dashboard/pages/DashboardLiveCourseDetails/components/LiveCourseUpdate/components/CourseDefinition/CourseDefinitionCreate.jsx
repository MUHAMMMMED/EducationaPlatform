
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function CourseDefinitionCreate({ BaseId, fetchCourse }) {
  const [showModalDefinitionCreate, setShowModalDefinitionCreate] = useState(false);
  const [formData, setFormData] = useState({
    base: BaseId,
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/course-definitions/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalDefinitionCreate(false);
      fetchCourse();
      // Clear the form fields after successful submission
      setFormData({ base: BaseId, title: '', description: '' });
    } catch (error) {
      console.error('Error creating course definition:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
    }
  };

  const handleCloseModal = () => { setShowModalDefinitionCreate(false); };


  return (
    <>
      <button onClick={() => setShowModalDefinitionCreate(true)} className="Creat_button">Create</button>
      <div className={`modal ${showModalDefinitionCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Definition Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="description">Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
            </div>
          </div><br /><br />
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
