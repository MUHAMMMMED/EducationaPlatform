
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../config';


const CreateMeeting = ({ fetchMeetings }) => {
  const [liveCourses, setLiveCourses] = useState([]);
  const [formData, setFormData] = useState({
    active: true,
    type: '',
    title: '',
    student: '',
    date: '',
    start_time: '',
    end_time: '',
    course: '',
  });
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => { setShowModal(false); };
  useEffect(() => {
    const fetchLiveCourses = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/LiveCourses/`);
        setLiveCourses(response.data);


      } catch (error) {
        console.error('Error fetching live courses:', error);
      }
    };

    fetchLiveCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Config.baseURL}/meetings/create/`, formData)
      .then((response) => {
        fetchMeetings();
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error creating meeting:', error);
      });
  };

  return (
    <div>




      <button className='But-create' onClick={() => setShowModal(true)}>create</button>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create New</h2>

          <div className="FOrm-container">
            <input type="text" id="title" placeholder="title" name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label htmlFor="date">عدد الطلاب</label>
              <input type="number" id="student" name="student" value={formData.student} onChange={handleChange} />
            </div>
            <div className="form-container-half">
              <label htmlFor="date">تاريخ الاجتماع:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            </div>  </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label htmlFor="start_time">بداية الاجتماع:</label>
              <input type="time" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} />
            </div>
            <div className="form-container-half">
              <label htmlFor="end_time">نهاية الاجتماع:</label>
              <input type="time" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} />
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label htmlFor="type">نوع الاجتماع:</label>
              <select className='form-Select' id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="All">الكل</option>
                <option value="ByCourse">بالدورة</option>
              </select>
            </div>
            {/* Course (if applicable) */}
            <div className="form-container-half">
              <label htmlFor="course">الدورة:</label>

              <select id="course" name="course" className='form-Select' value={formData.course} onChange={handleChange}>
                <option value="">اختر الدورة</option>
                {liveCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>

            </div>   </div>



          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className='button-form' type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button type=" " className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form></div> </div>



  );
};

export default CreateMeeting;
