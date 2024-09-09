import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    question_content: '',
    option_A: '',
    option_B: '',
    option_C: '',
    option_D: '',
    correct_option: '',
    question_image: null,
    question_video_youtube: '',
    question_video: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      await AxiosInstance.post(`${Config.baseURL}/Quiz/question_list/`, formDataObj);
      console.log('Form submitted successfully');
      // Close the modal after successful submission
      handleCloseModal();
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const [showModalAddQuestionForm, setShowModalAddQuestionForm] = useState(false);

  const handleCloseModal = () => {
    setShowModalAddQuestionForm(false);
    // Clear form data when closing modal
    setFormData({
      question_content: '',
      option_A: '',
      option_B: '',
      option_C: '',
      option_D: '',
      correct_option: '',
      question_image: null,
      question_video_youtube: '',
      question_video: null,
    });
  };

  return (
    <div>
      <button className="Edit-button" onClick={() => handleCloseModal(true)}>Create</button>
      <div className={`modal ${showModalAddQuestionForm ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create New</h2>




          <label>
            Question Content:
            <input type="text" name="question_content" value={formData.question_content} onChange={handleChange} required />
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
                <select name="correct_option" value={formData.correct_option} onChange={handleChange} required>
                  <option value="1">A</option>
                  <option value="2">B</option>
                  <option value="3">C</option>
                  <option value="4">D</option>
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
                Question Video:
                <input type="file" name="question_video" onChange={handleChange} accept="video/*" />
              </label>
            </div>

          </div>



          <button type="submit">Submit</button>
        </form>


        <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>




      </div>  </div>

  );
};

export default QuestionForm;
