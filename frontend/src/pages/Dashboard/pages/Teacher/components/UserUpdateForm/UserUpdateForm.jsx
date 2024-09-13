import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function UserUpdateForm({ user, fetchUser }) {
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    phone: user.phone || '',
    width_image: null,
    height_image: null,
    job_title: user.job_title || '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('job_title', formData.job_title);

    if (formData.width_image) {
      formDataToSend.append('width_image', formData.width_image);
    }

    if (formData.height_image) {
      formDataToSend.append('height_image', formData.height_image);
    }

    try {
      await AxiosInstance.put(`${Config.baseURL}/dashboard/users/update/${user.id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchUser();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // تحقق من أن الملف هو صورة قبل التحديث
    if (file && file.type.startsWith('image/')) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="Creat_button">Update</button>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update User</h2>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>
                First Name:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'>
                Last Name:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
              </label>
            </div>
          </div>
          <label className='label'>
            Job Title:
            <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} placeholder="Job Title" />
          </label>
          <label className='label'>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
          </label>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Width Image:
                <input type="file" name="width_image" accept="image/*" onChange={handleFileChange} />
              </label>
              <span style={{ float: 'left', color: '#000', width: '100%', padding: '15px', textAlign: 'center' }}>Width Image</span>
              {user.width_image && <img src={`${Config.mediaURL}${user.width_image}`} width={'100%'} alt="Width" />}
            </div>
            <div className="form-container-half">
              <label className='label'>Height Image:
                <input type="file" name="height_image" accept="image/*" onChange={handleFileChange} />
              </label>
              <span style={{ float: 'left', color: '#000', width: '100%', padding: '15px', textAlign: 'center' }}>Height Image</span>
              {user.height_image && <img src={`${Config.mediaURL}${user.height_image}`} width={'100%'} alt="Height" />}
            </div>
          </div>
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}>
              <button className="button-form" type="submit">Save</button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}