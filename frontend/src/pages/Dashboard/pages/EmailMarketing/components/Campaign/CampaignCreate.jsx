import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function CampaignCreate({ fetchCampaign }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
    Link: '',
    button_action: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await AxiosInstance.post(`${Config.baseURL}/EmailMarketing/campaigns/`, formData);
      fetchCampaign();
      // Reset form data after successful submission
      setFormData({
        name: '',
        subject: '',
        message: '',
        Link: '',
        button_action: '',
      });
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <br />
      <button onClick={handleOpenModal} className="Creat_button">Create New</button>
      <br /><br />
      {showModal && (
        <div className="modal show">
          <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Campaign</h2>
            
                <label className='label'>Campaign Name:
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" Campaign Name..." />
                </label>
               
             
                <label className='label'>Subject:
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="subject..."  />
                </label>
            
             
                <label className='label'>Message:
                   <textarea name="message"  style={{height:'100px'}}value={formData.message} onChange={handleChange} placeholder="message..." />
 
                </label>
          
           
                <label className='label'>Link:
                  <input type="text" name="Link" value={formData.Link} onChange={handleChange}  placeholder="Link..."  />
                </label>
        
    
                <label className='label'>Button Action:
                  <input type="text" name="button_action" value={formData.button_action} onChange={handleChange}  placeholder="Button Action..."  />
                </label>
             
            <div className="FOrmContainer">
              <div style={{ width: '78%' }}>
                <button className="button-form" type="submit">Save</button>
              </div>
              <div style={{ width: '20%' }}>
                <button type="button" className="cancel-button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
