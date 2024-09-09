import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const SlideCreate = ({ fetchDate }) => {
  const [showModalSlideCreate, setShowModalSlideCreate] = useState(false);

  const [formData, setFormData] = useState({
    top_slider_web: null,
    top_slider_mobile: null,
    is_active: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('top_slider_web', formData.top_slider_web);
      formDataToSend.append('top_slider_mobile', formData.top_slider_mobile);
      formDataToSend.append('is_active', formData.is_active);

      await AxiosInstance.post(`${Config.baseURL}/home/slide/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchDate();
      setShowModalSlideCreate(false);
    } catch (error) {
      console.error('Error creating slide:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalSlideCreate(false);
  };

  return (
    <>
      <button onClick={() => setShowModalSlideCreate(true)} className="Creat_button">
        Create
      </button>





      <div className={`modal ${showModalSlideCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Slide</h2>

          <div className="FOrm-container">
            <label htmlFor="top_slider_web">Image (Web):</label>
            <input type="file" name="top_slider_web" onChange={handleFileChange} accept="image/*" required />
          </div>

          <div className="FOrm-container">
            <label htmlFor="top_slider_mobile">Image (Mobile):</label>
            <input type="file" name="top_slider_mobile" onChange={handleFileChange} accept="image/*" required />
          </div>

          <div className="FOrm-container">
            <label className="label">
              Active:
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
            </label>
          </div>

          <div className="FOrmContainer">
            <div style={{ width: '78%' }}>
              <button className="button-form" type="submit">
                Save
              </button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SlideCreate;
