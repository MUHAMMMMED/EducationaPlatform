
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../config';

const FormUpdate = ({ item_id, fetchMeetings }) => {
  const [formData, setFormData] = useState({
    active: '',
    type: '',
    title: '',
    student: '',
    date: '',
    start_time: '',
    end_time: '',
    course: '',

  });
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [liveCourses, setLiveCourses] = useState([]);


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


  useEffect(() => {
    const fetch_meetings_list = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/meetings/detail/${item_id}/`);
        setFormData(response.data);
      } catch (error) { console.error('Error fetching timeline:', error); }


    };

    fetch_meetings_list();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${Config.baseURL}/meetings/update/${item_id}/`, formData);
      fetchMeetings();
      setShowModalEdit(false);
    } catch (error) {
      console.error('Error updating timeline:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${Config.baseURL}/meetings/delete/${item_id}/`);
      fetchMeetings();
      setShowModalDelete(false);
    } catch (error) {
      console.error('Error deleting timeline:', error);
    }
  };

  return (
    <>
      {/* <div className="Container-button">
        <div className="Container-Edit">
          <button className="Edit-button" onClick={() => setShowModalEdit(true)}>
            Edit
          </button>
        </div>
        <div className="Container-Delete">
          <button className="Delete-button" onClick={() => setShowModalDelete(true)}>
            Delete
          </button>
        </div>
      </div> */}

      <button className="Group-But But-update " onClick={() => setShowModalEdit(true)} >  Edit</button>
      <button className="Group-But But-delete " onClick={() => setShowModalDelete(true)} >Delete</button>





      {/* Delete Modal */}
      <div className={`modal ${showModalDelete ? 'show' : ''}`} id={item_id} onClick={() => setShowModalDelete(false)}>
        <div className="modal-contentDelete animate" onClick={(e) => e.stopPropagation()}>
          <h3>
            Are you sure you want to <strong>delete</strong> this item? <br />
            <p> {formData.title}</p>
          </h3>
          <br />
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}>
              <button className="button-form" onClick={handleDelete}>
                Delete
              </button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" onClick={() => setShowModalDelete(false)}>Cancel</button>

            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      <div className={`modal ${showModalEdit ? 'show' : ''}`} id={item_id} onClick={() => setShowModalEdit(false)}>
        <form className="modal-content animate" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Edit Item  </h2>



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
            <div style={{ width: '78%' }}>
              <button className="button-form" type="submit">
                Save
              </button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" onClick={() => setShowModalEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormUpdate;
