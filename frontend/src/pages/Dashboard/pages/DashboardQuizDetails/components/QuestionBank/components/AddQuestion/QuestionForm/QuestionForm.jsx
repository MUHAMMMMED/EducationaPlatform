
import React, { useState } from 'react';
import Config from '../../../../../../../../../config';
import AxiosInstance from '../../../../../../../../../desing-system/Authentication/AxiosInstance';
 
const QuestionForm = ({ data, creator, fetchQuestions }) => {
  const [formData, setFormData] = useState({
    creator: creator,
    question_content: '',
    option_A: '',
    option_B: '',
    option_C: '',
    option_D: '',
    correct_option: '',
    question_image: null,
    question_video_youtube: '',
    question_video: null,
    category: ''
  });
  const [showModalAddQuestionForm, setShowModalAddQuestionForm] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0], // Handle file inputs
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmission = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          // Skip appending intro_image and card_image if they are null
          if (key === 'question_image' && formData[key] === null) continue;
          formDataForSubmission.append(key, formData[key]);
        }
      }

      await AxiosInstance.post(`${Config.baseURL}/Quiz/question_list/`, formDataForSubmission);
      console.log('Form submitted successfully');
      handleCloseModal();
      fetchQuestions();
    } catch (error) {
      console.error('Error creating question:', error);
      setError('Error creating question. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModalAddQuestionForm(false);
    setFormData({
      creator: creator,
      question_content: '',
      option_A: '',
      option_B: '',
      option_C: '',
      option_D: '',
      correct_option: '',
      question_image: null,
      question_video_youtube: '',
      question_video: '',
      category: ''
    });
    setError('');
  };

  return (
    <div>
      <button className="Creat_button" onClick={() => setShowModalAddQuestionForm(true)}>Create</button>
      <div className={`modal ${showModalAddQuestionForm ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create New</h2>
          <label>
            Question Content:
            <input type="text" name="question_content" style={{height:'100px'}} value={formData.question_content} onChange={handleChange}   />
          </label>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label>
                Option A:
                <input type="text" name="option_A" value={formData.option_A} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-container-half">
              <label>
                Option B:
                <input type="text" name="option_B" value={formData.option_B} onChange={handleChange} required />
              </label>
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label>
                Option C:
                <input type="text" name="option_C" value={formData.option_C} onChange={handleChange} />
              </label>
            </div>
            <div className="form-container-half">
              <label>
                Option D:
                <input type="text" name="option_D" value={formData.option_D} onChange={handleChange} />
              </label>
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label>
                Correct Option:
                <select className='form-Select' name="correct_option" value={formData.correct_option} onChange={handleChange} required>
                  <option value="">Select Correct Option</option>
                  <option value="1">Option A</option>
                  <option value="2">Option B</option>
                  <option value="3">Option C</option>
                  <option value="4">Option D</option>
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label>
                Question Image:
                <input type="file" name="question_image" onChange={handleChange} accept="image/*" />
              </label>
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label>
                Question Video YouTube:
                <input type="text" name="question_video_youtube" value={formData.question_video_youtube} onChange={handleChange} />
              </label>
            </div>
            <div className="form-container-half">
              <label>
                Question Video link:
                <input type="text" name="question_video" onChange={handleChange} accept="video/*" />
              </label>
            </div>
          </div>

        
        
              <label>
                Category:
                <select className='form-Select' name="category" value={formData.category} onChange={handleChange}required>
                  <option value="">Select category</option>
                  {data.category && data.category.map(ex => (<option value={ex.id} key={ex.id}>{ex.title}</option>))}
                </select>
              </label>
              <br/> <br/> <br/>
         

          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>  
      </div>
    </div>
  );
};

export default QuestionForm;
