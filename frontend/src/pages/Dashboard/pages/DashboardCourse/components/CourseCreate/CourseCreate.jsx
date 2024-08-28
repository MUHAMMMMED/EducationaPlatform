 
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
 
export default function CourseCreate({ categories, instructors }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    active: false,
    level: '',
    category: '',
    card_image: null,
    title: '',
    description: '',
    price: 0,
    discount:0,
    author: '',
    intro_video:'',
    intro_image: null,
    Curriculum:'',
    language:'',
    course_length:'',
    Lectures:'',
    Enroll:'',
   
   
  });
  
  const handlecard_image = (e) => {
    const file = e.target.files[0]; // Get the first file from the array
    setFormData({ ...formData, card_image: file });
  };


  const handleintro_image = (e) => {
    const file = e.target.files[0]; // Get the first file from the array
    setFormData({ ...formData, intro_image: file });
  };


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(`${Config.baseURL}/Courses/courses/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
 
      // Navigate to the dashboard page after successful creation
      navigate(`/dashboard_Course/${response.data.id}`);
    } catch (error) {
      console.error('Error creating  course:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <><br/>
      <button onClick={() => setShowModal(true)} className="Creat_button">Create New</button>
      <br/><br/>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Course</h2>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Title:<input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Description:<input type="text" name="description" value={formData.description} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Price: <input type="number" name="price" value={formData.price} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Discount: <input type="number" name="discount" value={formData.discount} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Curriculum : <input type="text" name="Curriculum" value={formData.Curriculum} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> language: <input type="text" name="language" value={formData.language} onChange={handleChange} /></label>
            </div>
          </div>
   
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
              <label className='label'>Level:
                <select className='form-Select' name="level" value={formData.level} onChange={handleChange}>
                <option value='' disabled hidden>Select Level</option>
 
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>author: 
                <select name="author" className='form-Select' value={formData.author} onChange={handleChange}>
                <option value='' disabled hidden>Select Author</option>
 
                  {instructors.map(inst => (<option value={inst.id} key={inst.id}>{inst.user_full_name}</option>))}
                </select>
              </label>
            </div>
            <div className="form-container-half"> 
              <label className='label'>
              intro video:
                <input type="text" name="intro_video" onChange={handleChange} />
              </label>
            </div>
 
          </div>

          <div className="FOrm-container">
            <div className="form-container-half"> 
              <label className='label'>
              intro  image:
                <input type="file" name="intro_image" onChange={handleintro_image} />
              </label>
            </div>
            <div className="form-container-half"> 
              <label className='label'>
                Card Image:
                <input type="file" name="card_image" onChange={handlecard_image} />
              </label>
            </div>
          </div>



          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Lectures : <input type="number" name="Lectures" value={formData.Lectures} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Enroll: <input type="number" name="Enroll" value={formData.Enroll} onChange={handleChange} /></label>
            </div>
          </div>









          <div className="FOrm-container">
            <label className='label'> Active:<input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /></label>
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
 