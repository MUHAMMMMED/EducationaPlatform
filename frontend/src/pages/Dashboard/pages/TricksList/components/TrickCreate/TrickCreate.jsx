import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function TrickCreate({ categories, instructors, fetchTricks }) {

  const [formData, setFormData] = useState({
    active: false,
    category: '',
    Image: null,
    title: '',
    content: '',
    author: '',
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, Image: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if category and author are selected
    if (!formData.category || !formData.author) {
      console.error('Category and author must be selected');
      // You can handle this situation by showing an error message or any other way you prefer
      return;
    }

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'Image') {
        if (value instanceof File) {
          formDataToSend.append('Image', value);
        }
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await AxiosInstance.post(
        `${Config.baseURL}/tips/tip/`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setShowModal(false);
      fetchTricks();
    } catch (error) {
      console.error('Error creating tip:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <br />
      <button onClick={() => setShowModal(true)} className="Creat_button">Create New</button>
      <br /><br />
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Trick</h2>

          <label className='label'>Title:<input type="text" name="title" value={formData.title} onChange={handleChange} /></label>

          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label>Content :</label>
              <textarea name="content" value={formData.content} style={{ height: '200px' }} onChange={handleChange} />
            </div>
          </div>

          <label className='label'>
            Image:
            <input type="file" name="Image" onChange={handleImage} />
          </label>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Category:
                <select name="category" className='form-Select' value={formData.category} onChange={handleChange}>
                  <option value='' disabled hidden>Select Category</option>
                  {categories.map(cat => (<option value={cat.id} key={cat.id}>{cat.title}</option>))}
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'>Author:
                <select name="author" className='form-Select' value={formData.author} onChange={handleChange}>
                  <option value='' disabled hidden>Select Author</option>
                  {instructors.map(inst => (<option value={inst.id} key={inst.id}>{inst.user_full_name}</option>))}
                </select>
              </label>
            </div>
          </div>

          <div className="FOrm-container">
            <label className='label'>Active:<input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /></label>
          </div>

          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
