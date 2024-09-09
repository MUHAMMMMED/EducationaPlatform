import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
export default function LearnUpdate({ item, fetchEvent }) {
  const [showModalLearnUpdate, setShowModalLearnpdate] = useState(false);
  const [formData, setFormData] = useState({
    course: item.course,
    event: item.event,
    title: item.title,

  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/Event/learn/${item.id}/`, formData);
      setShowModalLearnpdate(false);
      fetchEvent();
    } catch (error) {

    }
  };
  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Event/learn/${item.id}/`);
      fetchEvent();
    } catch (error) {

    }
  };

  const handleCloseModal = () => {
    setShowModalLearnpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalLearnpdate(true)} >
        <span className='onLine-icon'><GrUpdate /></span></div>

      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>

      <div className={`modal ${showModalLearnUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>  Learn Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="title" />
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