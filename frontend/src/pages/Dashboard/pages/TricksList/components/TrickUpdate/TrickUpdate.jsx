import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function TrickUpdate({ tip, fetchTricks, categories, instructors }) {
  const [showModalTrickUpdate, setShowModalTrickUpdate] = useState(false);
  const [formData, setFormData] = useState({
    active: tip.active,
    category: tip.category.id,
    Image: tip.Image,
    title: tip.title,
    content: tip.content,
    author: tip.author.id,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, Image: file });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await AxiosInstance.put(`${Config.baseURL}/tips/tip/${tip.id}/`, formDataToSend);
      setShowModalTrickUpdate(false);
      fetchTricks();
    } catch (error) {
      console.error('Error updating trick:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/tips/tip/${tip.id}/`);
      fetchTricks();
    } catch (error) {
      console.error('Error deleting trick:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalTrickUpdate(false);
  };

  return (
    <>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalTrickUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      {showModalTrickUpdate && (
        <div className="modal show">
          <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 style={{ textAlign: 'center', padding: '15px' }}>Trick Update</h2>
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
            {tip.Image && <img src={`${Config.mediaURL}${tip.Image}`} style={{ objectFit: 'cover', width: '100%' }} alt={tip.title} />}

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
              <label className='label'>Active:
                <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
              </label>
            </div>

            <div className="FOrmContainer">
              <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
              <div style={{ width: '20%' }}><button className="cancel-button" type="button" onClick={handleCloseModal}>Cancel</button></div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}