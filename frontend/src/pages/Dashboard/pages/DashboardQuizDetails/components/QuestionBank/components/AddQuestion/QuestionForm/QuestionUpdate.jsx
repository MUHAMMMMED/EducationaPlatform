import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import Config from '../../../../../../../../../config';
import AxiosInstance from '../../../../../../../../../desing-system/Authentication/AxiosInstance';

const QuestionUpdate = ({ Item, data, fetchQuestions }) => {
  const [formData, setFormData] = useState({
    creator: Item.creator,
    question_content: Item.question_content,
    option_A: Item.option_A,
    option_B: Item.option_B,
    option_C: Item.option_C,
    option_D: Item.option_D,
    correct_option: Item.correct_option,
    question_image: null,
    question_video_youtube: Item.question_video_youtube,
    question_video: Item.question_video,

  });
  const [showModalAddQuestionUpdate, setShowModalAddQuestionUpdate] = useState(false);
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

      await AxiosInstance.put(`${Config.baseURL}/Quiz/question_Update/${Item.id}/`, formDataForSubmission);
      handleCloseModal();
      fetchQuestions();
    } catch (error) {
      console.error('Error updating question:', error);
      setError('Error updating question. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModalAddQuestionUpdate(false);
    setError('');
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/Quiz/question_Update/${Item.id}/`);
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  // Function to display all input fields along with their current values
  const displayInputFields = () => {
    return Object.entries(formData).map(([key, value]) => (
      <div key={key}>
        <label>{key}</label>: <span>{value}</span>
      </div>
    ));
  };

  return (

    <div>
      <div style={{ float: 'left', width: '65px', marginRight: '17px' }} onClick={() => setShowModalAddQuestionUpdate(true)}>
        <span className='onLine-icon'><GrUpdate /></span>
      </div>
      <div style={{ float: 'left', width: '65px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>

      <div className={`modal ${showModalAddQuestionUpdate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update Question</h2>
          <label>{Item.creator}
            Question Content:
            <input type="text" name="question_content" style={{ height: '100px' }} value={formData.question_content} onChange={handleChange} />
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

          <br /> <br /> <br />


          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionUpdate;
