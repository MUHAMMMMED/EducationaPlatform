
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
const SupporterCreate = ({ fetchDate }) => {
  const [showModalSupCreate, setShowModalSupCreate] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      await AxiosInstance.post(`${Config.baseURL}/home/supporters/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Fetch reviews again to update the list
      fetchDate();
      setShowModalSupCreate(false);
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };
  const handleCloseModal = () => { setShowModalSupCreate(false); };

  return (
    <>

      <button onClick={() => setShowModalSupCreate(true)} className="Creat_button">Create</button>
      <div className={`modal ${showModalSupCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>   Create</h2>


          <label>Title:</label>
          <input type="text" name="EMAIL_HOST_USER" value={formData.EMAIL_HOST_USER} onChange={handleChange} />

          <label htmlFor="image">Image:</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />

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

export default SupporterCreate;
