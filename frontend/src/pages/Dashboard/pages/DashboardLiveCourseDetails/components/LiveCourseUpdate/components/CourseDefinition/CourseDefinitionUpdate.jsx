
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function CourseDefinitionUpdate({ definition, fetchCourse }) {
  const [showModalDefinitionUpdate, setShowModalDefinitionUpdate] = useState(false);
  const [formData, setFormData] = useState({
    title: definition.title,
    description: definition.description
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/LiveCourses/course-definitions/${definition.id}/`, formData);
      // After successfully updating the course definition, refresh the list
      setShowModalDefinitionUpdate(false);
      fetchCourse();
    } catch (error) {

    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/course-definitions/${definition.id}/`);
      fetchCourse();
    } catch (error) {

    }
  };
  const handleCloseModal = () => {
    setShowModalDefinitionUpdate(false);
  };

  return (
    <>


      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalDefinitionUpdate(true)} >
        <span className='onLine-icon'><GrUpdate /></span></div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>

      <div className={`modal ${showModalDefinitionUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Definition Update</h2>
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
