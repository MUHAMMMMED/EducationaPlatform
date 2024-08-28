import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function SectionsUpdate({ item, fetchCourse }) {
  const [showModalSectionUpdate, setShowModalSectionUpdate] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    section_number: item.section_number,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/Courses/Section/${item.id}/`, formData);
      setShowModalSectionUpdate(false);
      fetchCourse();
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Courses/Section/${item.id}/`);
      fetchCourse();
    } catch (error) {
      // Handle error
    }
  };

  const handleCloseModal = () => {
    setShowModalDelete(false);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalSectionUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={() => setShowModalDelete(true)}><AiOutlineDelete /></span>
      </div>
      <div className={`modal ${showModalDelete ? 'show' : ''}`}>
        <div className="modal-content animate">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Delete Question</h2>
          <div>
            <p style={{ marginBottom: '45px', marginTop: '30px' }}>Are you sure you want to delete this Question?</p>
            <div className="FOrmContainer">
              <div style={{ width: '78%' }}>
                <button className="button-form" onClick={handleDelete}>Delete</button>
              </div>
              <div style={{ width: '20%' }}>
                <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${showModalSectionUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}> Section Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" >
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
            <div className="form-container-half"  >
              <label className='label' htmlFor="section_number">Section Number:</label>
              <input type="number" name="section_number" value={formData.section_number} onChange={handleChange} />
            </div>
          </div>
          <label className='label' htmlFor="description" style={{ width: '100%' }}>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="description" />
          <br /><br />
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
