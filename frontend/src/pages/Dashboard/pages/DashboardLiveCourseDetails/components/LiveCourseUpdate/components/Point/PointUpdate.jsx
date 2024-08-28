 
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
export default function PointUpdate({ item, fetchCourse }) {
  const [showModalPointUpdate, setShowModalPointUpdate] = useState(false);
  const [formData, setFormData] = useState({
 
    title:item.title,
    description:item.description
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/LiveCourses/points/${item.id}/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalPointUpdate(false);
      fetchCourse();
      // Clear the form fields after successful submission
      
    } catch (error) {
     
    }
  };
  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/points/${item.id}/`);
      fetchCourse();
    } catch (error) {
 
    }
  };
 
  const handleCloseModal = () => {
    setShowModalPointUpdate(false);
  };
 
  return (
    <>
      <div style={{ float: 'left', width: '65px',  marginRight:'17px'}}onClick={() => setShowModalPointUpdate(true)} >
        <span className='onLine-icon'><GrUpdate  /></span></div>
   
        <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>
 
      <div className={`modal ${showModalPointUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>  Point Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="description">description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="description..."></textarea>
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