import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
export default function FaqsUpdate({ item, fetchCourse }) {
  const [showModalfaqsUpdate, setShowModalfaqsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    course: item.course,
    question: item.question,
    answer: item.answer
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/Courses/course-faqs/${item.id}/`, formData);
      setShowModalfaqsUpdate(false);
      fetchCourse();
    } catch (error) {

    }
  };
  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Courses/course-faqs/${item.id}/`);
      fetchCourse();
    } catch (error) {

    }
  };

  const handleCloseModal = () => {
    setShowModalfaqsUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalfaqsUpdate(true)} >
        <span className='onLine-icon'><GrUpdate /></span></div>

      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span></div>

      <div className={`modal ${showModalfaqsUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>  faqs Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="question">question:</label>
              <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder="question" />
            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="answer">answer:</label>
              <textarea name="answer" value={formData.answer} onChange={handleChange} placeholder="answer..."></textarea>
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