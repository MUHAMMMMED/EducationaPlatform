
import React, { useEffect, useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function LiveCourseUpdateForm({ liveCourses }) {

  const [formData, setFormData] = useState({
    active: false,
    level: '',
    category: '',
    card_image: null,
    title: '',
    description: '',
    price: '',
    discount: '',
    join_telegram: '',
    join_whatsapp: '',
    waitingDate: '',
    time: '',
    author: '',

  });

  useEffect(() => {
    setFormData({
      active: liveCourses.active,
      level: liveCourses.level,
      category: liveCourses.category,
      card_image: liveCourses.card_image,
      title: liveCourses.title,
      description: liveCourses.description,
      price: liveCourses.price,
      discount: liveCourses.discount,
      join_telegram: liveCourses.join_telegram,
      join_whatsapp: liveCourses.join_whatsapp,
      waitingDate: liveCourses.waitingDate,
      time: liveCourses.time,
      author: liveCourses.author,


    });
  }, [liveCourses]);


  const handlecard_image = (e) => {
    const file = e.target.files[0];
    // Ensure filename does not exceed 100 characters
    const truncatedFilename = file.name.length > 100 ? file.name.substring(0, 100) : file.name;
    const truncatedFile = new File([file], truncatedFilename, { type: file.type });
    setFormData({ ...formData, card_image: truncatedFile });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        // Handle card_image separately as a file
        if (key === 'card_image') {
          if (value instanceof File) {
            // Append the file to FormData
            formDataToSend.append('card_image', value);
          }
        } else {
          formDataToSend.append(key, value);
        }
      });

      await AxiosInstance.put(`${Config.baseURL}/LiveCourses/live-courses/${liveCourses.id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);
    } catch (error) {

    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="Creat_button">Update</button>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update Live Course</h2>
          {/* Your form inputs */}
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Title:<input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
              </label>
            </div>
          </div>
          {/* Other form inputs */}
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Price: <input type="number" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%' }} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Discount: <input type="number" name="discount" value={formData.discount} onChange={handleChange} style={{ width: '100%' }} /></label>
            </div>
          </div>
          {/* Other form inputs */}
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>join to telegram: <input type="text" name="join_telegram" value={formData.join_telegram} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> join to whatsapp: <input type="text" name="join_whatsapp" value={formData.join_whatsapp} onChange={handleChange} /></label>
            </div>
          </div>
          {/* Other form inputs */}
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>waiting Date: <input type="date" name="waitingDate" value={formData.waitingDate} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> time on waiting Date : <input type="time" name="time" value={formData.time} onChange={handleChange} /></label>
            </div>
          </div>
          {/* Other form inputs */}
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Category:
                <select name="category" className='form-Select' value={formData.category} onChange={handleChange}>
                  <option value='[]' disabled hidden >Category</option>
                  {liveCourses.categories && liveCourses.categories.length > 0 && liveCourses.categories.map(cat => (
                    <option value={cat.id} key={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'>Level:
                <select className='form-Select' name="level" value={formData.level} onChange={handleChange}>
                  <option value='' disabled hidden >Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>
          </div>
          {/* Other form inputs */}
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>
                Author:
                <select name="author" className='form-Select' value={formData.author} onChange={handleChange}>
                  <option value='' disabled hidden>Select Author</option>
                  {liveCourses.instructors && liveCourses.instructors.length > 0 && liveCourses.instructors.map(inst => (
                    <option value={inst.id} key={inst.id}>{inst.user_full_name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-container-half">
              <label className='label'>
                Card Image:
                <input type="file" name="card_image" onChange={handlecard_image} />
              </label> </div></div>
          <div className="FOrm-container">


            <label className='label'>Active:<input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /></label>
          </div>

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
