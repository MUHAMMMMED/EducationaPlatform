
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function FaqsCreat({ Course, fetchCourse }) {
  const [showModalfaqsCreate, setShowModalfaqsCreate] = useState(false);
  const [formData, setFormData] = useState({
    course: Course,
    question: '',
    answer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Courses/course-faqs/`, formData);
      setShowModalfaqsCreate(false);
      setFormData({
        course: Course.id, // Reset course ID after submission
        question: '',
        answer: '',
      });
      fetchCourse();
    } catch (error) {
      // Handle error
      console.error('Error creating FAQ:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModalfaqsCreate(false);
  };

  return (
    <>
      <button className="Open_button" onClick={() => setShowModalfaqsCreate(true)}>Create</button>
      <div className={`modal ${showModalfaqsCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>FAQs Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="question">Question:</label>
              <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder="Question" />
            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="answer">Answer:</label>
              <textarea name="answer" value={formData.answer} onChange={handleChange} placeholder="Answer..."></textarea>
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
