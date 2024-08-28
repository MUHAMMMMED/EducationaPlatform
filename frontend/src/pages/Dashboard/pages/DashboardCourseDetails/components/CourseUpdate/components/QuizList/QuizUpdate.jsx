import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function QuizUpdate({ item, fetchCourse }) {
  const [showModalQuizUpdate, setShowModalQuizUpdate] = useState(false);
  const [formData, setFormData] = useState({
    course: item.course,
    title: item.title,
    description: item.description,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/Courses/episode_quiz/${item.id}/`, formData);
      setShowModalQuizUpdate(false);
      fetchCourse();
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Courses/episode_quiz/${item.id}/`);
      fetchCourse();
    } catch (error) {
      // Handle error
    }
  };

  const handleCloseModal = () => {
    setShowModalQuizUpdate(false);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalQuizUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={() => setShowModalDelete(true)}><AiOutlineDelete /></span>
      </div>
      <div className={`modal ${showModalDelete ? 'show' : ''}`}>
        <div className="modal-content animate">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Delete Quiz</h2>
          <div>
            <p style={{ marginBottom: '45px', marginTop: '30px' }}>Are you sure you want to delete this Quiz?</p>
            <div className="FOrmContainer">
              <div style={{ width: '78%' }}>
                <button className="button-form" onClick={handleDelete}>Delete</button>
              </div>
              <div style={{ width: '20%' }}>
                <button className="cancel-button" onClick={() => setShowModalDelete(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${showModalQuizUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Quiz Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }} >
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div>
          <label className='label' htmlFor="description" style={{ width: '100%' }}>Description:</label>
          <input type="text" name="description" style={{ height: '100px' }} value={formData.description} onChange={handleChange} placeholder="Description" />
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
