import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function CourseUpdateForm({ Course, fetchCourse }) {

  const [formData, setFormData] = useState({
    active: Course.active,
    level: Course.level,
    category: Course.category.id,
    card_image: null,
    title: Course.title,
    description: Course.description,
    price: Course.price,
    discount: Course.discount,
    author: Course.author,
    intro_video: Course.intro_video,
    intro_image: null,
    Curriculum: Course.Curriculum,
    language: Course.language,
    course_length: Course.course_length,
    Enroll: Course.Enroll,
    exam: Course.exam?.id || '',
    pixal_id: Course.pixal_id,

    // course_sections:Course?.course_sections.id,
  });

  const handlecard_image = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, card_image: file });
  };

  const handleintro_image = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, intro_image: file });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'author') {
      // If the selected value is not 'undefined', set the author field to the selected value
      if (value !== 'undefined') {
        setFormData({ ...formData, [name]: parseInt(value) });
      } else {
        // If the selected value is 'undefined', set the author field to null
        setFormData({ ...formData, [name]: null });
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'card_image' || key === 'intro_image') {
          if (value instanceof File) {
            formDataToSend.append(key, value);
          }
        } else {
          formDataToSend.append(key, value);
        }
      });
      await AxiosInstance.put(`${Config.baseURL}/Courses/course_detail/${Course.id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowCourseModal(false);
      fetchCourse();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [showCourseModal, setShowCourseModal] = useState(false);
  const handleCloseModal = () => {
    setShowCourseModal(false);
  };

  return (
    <>
      <button onClick={() => setShowCourseModal(true)} className="Creat_button">Update</button>
      <div className={`modal ${showCourseModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update  Course</h2>
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
                  {Course.categories && Course.categories.length > 0 && Course.categories.map(cat => (<option value={cat.id} key={cat.id}>{cat.title}</option>))}
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'>Level:
                <select className='form-Select' name="level" value={formData.level} onChange={handleChange}>
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
                  {Course.user && Course.user.length > 0 && Course.user.map(inst => (
                    <option value={inst.id} selected={inst.id === formData.author} key={inst.id}>{inst.user_full_name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'>
                intro video:
                <input type="text" name="intro_video" value={formData.intro_video} onChange={handleChange} />
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
              <label className='label'>Exam:
                <select name="exam" className='form-Select' value={formData.exam} onChange={handleChange}>
                  <option value='' disabled hidden>Select Exam</option>
                  {/* {Course.Exam && Course.Exam.length > 0 && Course.Exam.map(ex => (
                    <option value={ex.id} key={ex.id}>{ex.title}</option>
                  ))} */}

                  {Course.Exam && Course.Exam.length > 0 && Course.Exam.map(ex => (
                    <option value={ex.id} key={ex.id}>{ex.title}</option>
                  ))}

                </select>
              </label>
            </div>




            <div className="form-container-half">
              <label className='label'>Enroll: <input type="number" name="Enroll" value={formData.Enroll} onChange={handleChange} /></label>
            </div>
          </div>

          <label>pixal Id:</label>
          <input type="text" name="pixal_id" value={formData.pixal_id} onChange={handleChange} />

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
