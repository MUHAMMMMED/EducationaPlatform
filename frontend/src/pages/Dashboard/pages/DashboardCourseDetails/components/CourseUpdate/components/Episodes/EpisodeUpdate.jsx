

import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function EpisodeUpdate({ item, Course, fetchCourse }) {
  const [showModalEpisodeUpdate, setShowModalEpisodeUpdate] = useState(false);
  const [formData, setFormData] = useState({
    course: item.course,
    title: item.title,
    description: item.description,
    material_link: item.material_link,
    length: item.length,
    video_link: item.video_link,
    video_id: item.video_id,
    is_preview: item.is_preview,
    serial_number: item.serial_number,
    Transcript: item.Transcript
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input type is a checkbox, update the formData with the checked value
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/Courses/episodes/${item.id}/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalEpisodeUpdate(false);
      fetchCourse();
      // Clear the form fields after successful submission
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Courses/episodes/${item.id}/`);
      fetchCourse();
    } catch (error) {
      // Handle error
    }
  };

  const handleCloseModal = () => {
    setShowModalEpisodeUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalEpisodeUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal ${showModalEpisodeUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Episode Update</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title :</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" >
              <label>Video Link :</label>
              <input type="text" name="video_link" value={formData.video_link} onChange={handleChange} />
            </div>
            <div className="form-container-half" >
              <label>Video ID :</label>
              <input type="text" name="video_id" value={formData.video_id} onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" >
              <label>Material Link :</label>
              <input type="text" name="material_link" value={formData.material_link} onChange={handleChange} />
            </div>
            <div className="form-container-half" >
              <label>Length :</label>
              <input type="number" name="length" value={formData.length} onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label>Quiz :</label>
              <select name="exam" className='form-Select' value={formData.exam} onChange={handleChange}>
                <option value='' >Select Quiz</option>
                {Course.EpisodeQuiz && Course.EpisodeQuiz.length > 0 && Course.EpisodeQuiz.map(ex => (
                  <option value={ex.id} key={ex.id}>{ex.title}</option>
                ))}
              </select>
            </div>
            <div className="form-container-half" style={{ marginTop: '5px' }} >
              <label>Serial Number :</label>
              <input type="number" name="serial_number" value={formData.serial_number} onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label>Transcript :</label>
              <textarea name="Transcript" value={formData.Transcript} style={{ height: '200px' }} onChange={handleChange} />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" >
              <label> Is Preview :
                <input type="checkbox" name="is_preview" checked={formData.is_preview} onChange={handleChange} />
              </label>
            </div>
          </div>
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
