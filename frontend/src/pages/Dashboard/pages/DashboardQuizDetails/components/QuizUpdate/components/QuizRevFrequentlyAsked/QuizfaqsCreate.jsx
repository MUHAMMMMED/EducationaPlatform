import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function QuizfaqsCreate({ quiz, fetchQuiz }) {
  const [showModalfaqsCreate, setShowModalfaqsCreate] = useState(false);
  const [formData, setFormData] = useState({
    exam: quiz,
    question: '',
    answer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await AxiosInstance.post(`${Config.baseURL}/Quiz/faq_list/`, formData);
      setShowModalfaqsCreate(false);
      setFormData({ exam: quiz, question: '', answer: '' });

      fetchQuiz();
    } catch (error) {

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
          <h2 style={{ textAlign: 'center', padding: '15px' }}>  faqs Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="question">question:</label>
              <input type="text" name="question" value={formData.question} onChange={handleChange} placeholder="question" />
            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="answer">answer:</label>
              <textarea name="answer" value={formData.answer} onChange={handleChange} placeholder="answer..."></textarea>
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