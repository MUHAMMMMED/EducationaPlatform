
import React, { useState } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function PointCreate({ item, fetchCourse }) {
  const [showModalPointCreate, setShowModalPointCreate] = useState(false);
  const [formData, setFormData] = useState({
    Point: item.id,
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/points/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalPointCreate(false);
      setFormData({ Point: item.id, title: '', description: '' });
      fetchCourse();


    } catch (error) {

    }
  };

  if (item === null) {
    fetchCourse();
  }
  const handleCloseModal = () => {
    setShowModalPointCreate(false);
  };

  return (
    <>

      <div style={{ float: 'left', width: '65px', marginRight: '15px' }} onClick={() => setShowModalPointCreate(true)} ><span className='onLine-icon'><IoCreateOutline /></span></div>



      <div className={`modal ${showModalPointCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>  Point Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="description">description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="description..." />
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