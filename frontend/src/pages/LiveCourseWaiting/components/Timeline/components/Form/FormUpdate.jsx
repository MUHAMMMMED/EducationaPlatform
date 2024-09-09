import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../../../config';
import './Form.css';

const FormUpdate = ({ course_id, item_id, fetchCourse }) => {

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    active: false,
    index: 0,
    join_meeting: '',
    material_link: '',
    join_Course: '',
    Course_Coupon: '',
    join_Quiz: '',
    Quiz_Coupon: '',
    date: '',
    time: '',
    Lesson_link: '',
    complete: false,
  });

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await axios.get(`${Config.baseURL}/LiveCourses/timeline/${item_id}/${course_id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      }
    };

    fetchTimeline();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${Config.baseURL}/LiveCourses/timeline/${item_id}/${course_id}/`, formData);
      fetchCourse();
      setShowModalEdit(false);
    } catch (error) {
      console.error('Error updating timeline:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${Config.baseURL}/LiveCourses/timeline/${item_id}/${course_id}/`);
      fetchCourse();
      setShowModalDelete(false);
    } catch (error) {
      console.error('Error deleting timeline:', error);
    }
  };

  return (
    <>
      <div className="Container-button">
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
      </div>

      {/* Delete Modal */}
      <div className={`modal ${showModalDelete ? 'show' : ''}`} id={item_id} onClick={() => setShowModalDelete(false)}>
        <div className="modal-contentDelete animate" onClick={(e) => e.stopPropagation()}>
          <h3>
            Are you sure you want to <strong>delete</strong> this item? {item_id}
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
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Edit Item {item_id}</h2>



          <div className="form-container">
            <input type="text" placeholder="Title: " name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="form-container">
            <textarea
              name="description"
              placeholder=" Description:"
              value={formData.description} onChange={handleChange}
            />
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <textarea
                name="join_meeting"
                placeholder="Join Meeting: "
                value={formData.join_meeting} onChange={handleChange}
              />
            </div>
            <div className="form-container-half">
              <textarea
                name="material_link"
                placeholder="Material Link: "
                value={formData.material_link} onChange={handleChange}
              />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <textarea
                name="join_Course"
                placeholder="Join Course:"
                value={formData.join_Course} onChange={handleChange}
              />
            </div>
            <div className="form-container-half">
              <input
                type="text"
                name="Course_Coupon"
                placeholder="Course Coupon: "
                value={formData.Course_Coupon} onChange={handleChange}
              />
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <textarea name="join_Quiz" placeholder="Join Quiz:" value={formData.join_Quiz} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <input
                type="text"
                name="Quiz_Coupon"
                placeholder="Quiz Coupon: "
                value={formData.Quiz_Coupon} onChange={handleChange}
              />
            </div>
          </div>
          <div className="FOrm-container">
            <div className="form-container-half">
              <input type="date" name="date" placeholder="Date: " value={formData.date} onChange={handleChange} />
            </div>

            <div className="form-container-half">
              <input type="time" name="time" placeholder=" Time:" value={formData.time} onChange={handleChange} />
            </div>
          </div>

          <div className="form-container">
            <textarea name="Lesson_link" placeholder="Lesson Link: " value={formData.Lesson_link} onChange={handleChange} />
          </div>

          <div style={{ padding: '5px' }} className="FOrmContainer">
            <div>
              <div className="label">Index</div>
              <div className="checkbox-container">
                <input type="number" name="index" id="index" value={formData.index} onChange={handleChange} />
              </div>
            </div>

            <div>
              <div className="label">Active</div>
              <div className="checkbox-container">
                <label className="switch">
                  <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div>
              <div className="label">Complete</div>
              <div className="checkbox-container">
                <label className="switch">
                  <input type="checkbox" name="complete" checked={formData.complete} onChange={handleChange} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

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
