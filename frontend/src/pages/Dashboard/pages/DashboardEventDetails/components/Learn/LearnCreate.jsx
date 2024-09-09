
import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';


export default function LearnCreate({ eventId, fetchEvent }) {
  const [showModalLearnCreate, setShowModalLearnCreate] = useState(false);
  const [formData, setFormData] = useState({
    event: eventId,
    title: '',

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Event/learn/`, formData);
      setShowModalLearnCreate(false);
      setFormData({
        event: eventId,
        title: '',
      });
      fetchEvent();
    } catch (error) {
      // Handle error
      console.error('Error creating Learn:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalLearnCreate(false);
  };

  return (
    <>
      <button className="Open_button" onClick={() => setShowModalLearnCreate(true)}>Create</button>
      <div className={`modal ${showModalLearnCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Learn Create</h2>
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
