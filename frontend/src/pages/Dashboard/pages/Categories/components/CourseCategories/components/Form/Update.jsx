
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
export default function Update({ item, fetchCategories }) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [formData, setFormData] = useState({

    title: item.title,

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/Query/Category/${item.id}/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalUpdate(false);
      fetchCategories();
      // Clear the form fields after successful submission

    } catch (error) {

    }
  };
  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Query/Category/${item.id}/`);
      fetchCategories();
    } catch (error) {

    }
  };

  const handleCloseModal = () => {
    setShowModalUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalUpdate(true)} >
        <span className='onLine-icon'><GrUpdate /></span></div>

      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>

      <div className={`modal ${showModalUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}> Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
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