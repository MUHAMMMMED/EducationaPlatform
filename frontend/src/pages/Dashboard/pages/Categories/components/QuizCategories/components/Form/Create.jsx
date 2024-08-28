 
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
 
export default function Create({ fetchCategories }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    title:'',
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Quiz/Category/`, formData);
      // After successfully adding a new course definition, refresh the list
      setShowModalCreate(false);
      setFormData({title: ''  });
      fetchCategories();
    
      
    } catch (error) {
     
    }
  };
 
 
  const handleCloseModal = () => {
    setShowModalCreate(false);
  };
 
  return (
    <>
 

  <button onClick={() => setShowModalCreate(true)} className="Creat_button">Create New</button> 

 
      <div className={`modal ${showModalCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit}  >
          <h2 style={{ textAlign: 'center', padding: '15px' }}>    Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
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