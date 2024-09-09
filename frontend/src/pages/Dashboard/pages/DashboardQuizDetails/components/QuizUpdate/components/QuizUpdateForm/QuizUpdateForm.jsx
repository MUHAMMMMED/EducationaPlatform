import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

export default function QuizUpdateForm({ quiz, fetchQuiz }) {

  const [formData, setFormData] = useState({
    level: quiz.level,
    title: quiz.title,
    description: quiz.description,
    price: quiz.price,
    discount: quiz.discount,
    creator: quiz.creator,
    time_to_answer: quiz.time_to_answer,
    WrongAnswers: quiz.WrongAnswers,
    tries: quiz.tries,
    Enroll: quiz.Enroll,
    active: quiz.active,
    card_image: null,
    intro_video: quiz.intro_video,
    intro_image: null,
    category: quiz.category,
    pixal_id: quiz.pixal_id,
  });

  const handlecard_image = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, card_image: file });
  };

  const handleIntroImage = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, intro_image: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataForSubmission = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          // Skip appending intro_image and card_image if they are null
          if ((key === 'intro_image' || key === 'card_image') && formData[key] === null) continue;
          formDataForSubmission.append(key, formData[key]);
        }
      }

      await AxiosInstance.put(`${Config.baseURL}/Quiz/exam_operations/${quiz.id}/`, formDataForSubmission, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);
      fetchQuiz();
    } catch (error) {
      console.error('Error Update exam:', error);
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
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Update Quiz</h2>
          <label className='label'>Title:<input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'> Description:<input type="text" name="description" value={formData.description} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'>Intro Video: <input type="text" name="intro_video" value={formData.intro_video} onChange={handleChange} /></label>
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Card Image: <input type="file" name="card_image" onChange={handlecard_image} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Intro Image<input type="file" name="intro_image" onChange={handleIntroImage} /></label>
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
              <label className='label'>Category:
                <select name="category" className='form-Select' value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {quiz.categories.map(cat => (<option value={cat.id} key={cat.id}>{cat.title}</option>))}
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'>Level:
                <select className='form-Select' name="level" value={formData.level} onChange={handleChange}>
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Creator:
                <select name="creator" className='form-Select' value={formData.creator} onChange={handleChange}>
                  <option value="">Select Creator</option>
                  {quiz.instructors.map(inst => (<option value={inst.id} key={inst.id}>{inst.user_full_name}</option>))}
                </select>
              </label>
            </div>
            <div className="form-container-half">
              <label>Time to Answer:
                <input type="number" name="time_to_answer" value={formData.time_to_answer} onChange={handleChange} />
              </label>
            </div> </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>Tries:<input type="number" name="tries" value={formData.tries} onChange={handleChange} /></label>
            </div>
            <div className="form-container-half">
              <label className='label'> Enroll: <input type="number" name="Enroll" value={formData.Enroll} onChange={handleChange} /></label>
            </div>
          </div>

          <label>pixal Id:</label>
          <input type="text" name="pixal_id" value={formData.pixal_id} onChange={handleChange} />

          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'>WrongAnswers: <input type="checkbox" name="WrongAnswers" checked={formData.WrongAnswers} onChange={handleChange} /></label>
            </div>


            <div className="form-container-half">
              <label className='label'> Active:<input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /></label>
            </div>
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
