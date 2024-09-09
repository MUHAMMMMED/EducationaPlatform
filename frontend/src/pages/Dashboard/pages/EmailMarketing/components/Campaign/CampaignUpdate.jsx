

import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function CampaignUpdate({ item, fetchCampaign }) {
  const [showModalCampaignUpdate, setShowModalCampaignUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    subject: item.subject,
    message: item.message,
    Link: item.Link,
    button_action: item.button_action,
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
      await AxiosInstance.put(`${Config.baseURL}/EmailMarketing/campaign/${item.id}/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalCampaignUpdate(false);
      fetchCampaign();
      // Clear the form fields after successful submission
    } catch (error) {
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/EmailMarketing/campaign/${item.id}/`);
      fetchCampaign();
    } catch (error) {
      // Handle error
    }
  };

  const handleCloseModal = () => {
    setShowModalCampaignUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalCampaignUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal ${showModalCampaignUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">


          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update Campaign </h2>

          <label className='label'>Campaign Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" Campaign Name..." />
          </label>


          <label className='label'>Subject:
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="subject..." />
          </label>


          <label className='label'>Message:
            <textarea name="message" style={{ height: '100px' }} value={formData.message} onChange={handleChange} placeholder="message..." />

          </label>


          <label className='label'>Link:
            <input type="text" name="Link" value={formData.Link} onChange={handleChange} placeholder="Link..." />
          </label>


          <label className='label'>Button Action:
            <input type="text" name="button_action" value={formData.button_action} onChange={handleChange} placeholder="Button Action..." />
          </label>

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
