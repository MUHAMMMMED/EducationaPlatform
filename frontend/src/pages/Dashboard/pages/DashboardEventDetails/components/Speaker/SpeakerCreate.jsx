import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

const SpeakerCreate = ({ event, fetchEvent }) => {
  const [formData, setFormData] = useState({
    event: event.id,
    image: null,
    name: '',
    info: '',
  });

  const [showModalSpeakerCreate, setShowModalSpeakerCreate] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Append all form data to FormData
    Object.entries(formData).forEach(([key, value]) => {
      // Handle image separately as a file
      if (key === 'image') {
        if (value instanceof File) {
          // Append the file to FormData
          formDataToSend.append('image', value);
        }
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      await AxiosInstance.post(
        `${Config.baseURL}/Event/speaker/`,
        formDataToSend, // Pass FormData directly as the request body
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the correct content type header
          },
        }
      );

      // Clear form data after successful submission
      setFormData({
        event: event.id,
        image: null,
        name: '',
        info: '',
      });

      setShowModalSpeakerCreate(false);
      fetchEvent();
      // Handle any other actions after successful submission, such as showing a success message
    } catch (error) {
      console.error('Error creating speaker:', error);
      // Handle error responses, such as showing an error message to the user
    }
  };


  const handleCloseModal = () => {
    setShowModalSpeakerCreate(false);
  };

  return (
    <>
      <button className="Open_button" onClick={() => setShowModalSpeakerCreate(true)}>Create</button>

      <div className={`modal ${showModalSpeakerCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Speaker Create</h2>

          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="name">name:</label>
              <textarea name="name" value={formData.name} onChange={handleChange} placeholder="name..." />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="info">info:</label>
              <textarea name="info" value={formData.info} onChange={handleChange} placeholder="info..." />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="image">Image:</label>
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>

          {/* Form buttons */}
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SpeakerCreate;
