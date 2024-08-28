import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function SectionsCreate({ Course, fetchCourse }) {
  const [showModalSectionCreate, setShowModalSectionCreate] = useState(false);
  const [formData, setFormData] = useState({
    courseId: Course.id ,
    title: '',
    description: '',
    section_number: '', 
   
  });
 
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Courses/Section/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalSectionCreate(false);
      fetchCourse();
      // Clear the form fields after successful submission
      setFormData({  courseId:Course.id ,title: '', description: '', section_number: '',   });
        
       
       
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
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Section Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" >
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
            <div className="form-container-half"  >
              <label className='label' htmlFor="section_number">Section Number:</label>
              <input type="number" name="section_number" value={formData.section_number} onChange={handleChange}  />
            </div> </div> 
 
              <label className='label' htmlFor="description" style={{ width: '100%' }}>Description:</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange}   placeholder="description" />
 
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
