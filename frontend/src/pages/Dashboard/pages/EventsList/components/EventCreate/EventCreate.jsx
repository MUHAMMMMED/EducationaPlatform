import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function EventCreate({ fetchEvent }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    join_meeting_link: '',
    active: false, // Initialize active to false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(`${Config.baseURL}/Event/events/`, formData);
      setFormData({
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        join_meeting_link: '',
        join_telegram: '',
        join_whatsapp: '',

        active: false, // Reset active to false after submission
      });
      setShowModal(false);
      fetchEvent();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <br />
      <button onClick={() => setShowModal(true)} className="Creat_button">Create New</button>
      {/* <Link to={"/students_block"} ><button   className="Creat_button" style={{marginRight:'50px'}}>  Students block</button></Link> */}

      <br /><br />
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}> Create Event</h2>
          <label className='label'>Title:<input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
          <label className='label'> Description:<input type="text" name="description" value={formData.description} onChange={handleChange} /></label>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Join Meeting Link:<input type="text" name="join_meeting_link" value={formData.join_meeting_link} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Date:<input type="date" name="date" value={formData.date} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'> Start Time:<input type="time" name="start_time" value={formData.start_time} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> End Time:<input type="time" name="end_time" value={formData.end_time} onChange={handleChange} /></label>
            </div>
          </div>


          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'> join telegram:<input type="text" name="join_telegram" value={formData.join_telegram} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> join whatsapp:<input type="text" name="join_whatsapp" value={formData.join_whatsapp} onChange={handleChange} /></label>
            </div>
          </div>

          <div className="FOrm-container">
            <label className='label'> Active:<input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /></label>
          </div>
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
