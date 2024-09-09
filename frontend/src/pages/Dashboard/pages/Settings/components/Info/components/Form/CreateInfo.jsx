import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function CreateInfo({ fetchDate }) {

  const [formData, setFormData] = useState({

    logo_title: '',
    offer_message: '',
    whatsapp: '',
    linkedin: '',
    snapchat: '',
    instagram: '',
    twitter: '',
    facebook: '',
    pixal_id: '',
    about: '',
    email: '',


  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/home/info/`, formData,);
      fetchDate();

    } catch (error) {
      console.error('Error creating   :', error);
    }
  };




  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <><br />
      <button onClick={() => setShowModal(true)} className="Creat_button">Create  </button>
      <br /><br />
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit}  >
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Info</h2>


          <label>Logo Title:</label>
          <input type="text" name="logo_title" value={formData.logo_title} onChange={handleChange} />

          <div className="FOrm-container">
            <div className="form-container-half">
              <label>WhatsApp:</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label>LinkedIn:</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
            </div>
          </div>



          <div className="FOrm-container">
            <div className="form-container-half">
              <label>Instagram:</label>
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label>Snapchat:</label>
              <input type="text" name="snapchat" value={formData.snapchat} onChange={handleChange} />
            </div>
          </div>



          <div className="FOrm-container">
            <div className="form-container-half">
              <label>Twitter:</label>
              <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label>Facebook:</label>
              <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />

            </div>
          </div>


          <div className="FOrm-container">
            <div className="form-container-half">
              <label>email:</label>
              <input type="text" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <label>About:</label>
              <input type="text" name="about" value={formData.about} onChange={handleChange} />

            </div>
          </div>


          <label>Offer Message:</label>
          <input type="text" name="offer_message" value={formData.offer_message} onChange={handleChange} />

          <label>pixal Id:</label>
          <input type="text" name="pixal_id" value={formData.pixal_id} onChange={handleChange} />

          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
