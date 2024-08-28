import React, { useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../../../../config';
import AxiosInstance from '../../../../../../../../../desing-system/Authentication/AxiosInstance';

const SlideUpdate = ({ fetchDate, item }) => {
  const [showModalSlideUpdate, setShowModalSlideUpdate] = useState(false);
  const [formData, setFormData] = useState({
    top_slider_web: item.top_slider_web,
    top_slider_mobile: item.top_slider_mobile,
    active: item.active,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        if (formData[key] instanceof File && formData[key]) {
          formDataObj.append(key, formData[key]);
        } else if (key !== 'top_slider_web' && key !== 'top_slider_mobile') {
          formDataObj.append(key, formData[key]);
        }
      }
      // Append 'active' field inside the loop
      formDataObj.append('active', formData.active);

      await AxiosInstance.put(`${Config.baseURL}/home/slide/${item.id}/`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchDate();
      setShowModalSlideUpdate(false);
    } catch (error) {
      console.error('Error updating slide:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalSlideUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px',  marginRight:'17px',marginBottom:'10px'}} onClick={() => setShowModalSlideUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>

      <div className={`modal ${showModalSlideUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update Slide</h2>

  
            <label htmlFor="top_slider_web">Image (Web):</label>
            <input type="file" name="top_slider_web" onChange={handleFileChange} accept="image/*" />
        

         
            <label htmlFor="top_slider_mobile">Image (Mobile):</label>
            <input type="file" name="top_slider_mobile" onChange={handleFileChange} accept="image/*" />
        

          <div className="Form-container">
          <div className="form-container-half"> 

            <label className="label">
              Active:
              <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
            </label>

            </div> </div>

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

export default SlideUpdate;
