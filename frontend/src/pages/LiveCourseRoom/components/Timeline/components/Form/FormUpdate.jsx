import React, { useEffect, useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import './Form.css';

const FormUpdate = ({ course_id,meeting, item_id,fetchCourse}) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    meeting:'',
    course:course_id,
    material_link: '', 
    join_Quiz: '',
    Quiz_Coupon: '',
    Lesson_link: '',
  });
 
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/timeline/${item_id}/${course_id}/`);
        setFormData(response.data);
      } catch (error) {
        
      }
    };
 
  fetchTimeline();
}, [course_id, item_id]); // Add course_id and item_id to the dependency array

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = value;
  
    // If the field is 'meeting', parse the value as an integer
    if (name === 'meeting') {
      val = parseInt(value); // Parse the value as an integer
    } else {
      // For other fields, handle checkboxes
      val = type === 'checkbox' ? checked : value;
    }
  
    setFormData({ ...formData, [name]: val });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/LiveCourses/api/timeline/${item_id}/${course_id}/`, formData);
 
      fetchCourse();
      setShowModalEdit(false);
    } catch (error) {
     }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/api/timeline/${item_id}/${course_id}/`);
      fetchCourse();
      setShowModalDelete(false);
    } catch (error) {
     
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
        {/* <div className="Container-Delete">
          <button className="Delete-button" onClick={() => setShowModalDelete(true)}>
            Delete
          </button>
        </div> */}
      </div>

      {/* Delete Modal */}
      <div className={`modal ${showModalDelete ? 'show' : ''}`} id={item_id} onClick={() => setShowModalDelete(false)}>
        <div className="modal-contentDelete animate" onClick={(e) => e.stopPropagation()}>
          <h3>
            Are you sure you want to <strong>delete</strong> this timeline?
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
<h2 style={{ textAlign: 'center', padding: '15px' }}>Edit timeline </h2>
 
<div className="FOrm-container">
<div className="form-container-half"style={{ width: '100%' }} >
<label className='label'>  Title : 
<input type="text" placeholder="Title: " name="title" value={formData.title} onChange={handleChange}  /></label>
</div>
{/* <div className="form-container-half"style={{marginTop:'10px'}} >
<label className='label'> Select Meeting :  
 <select id="meeting" className="select" name="meeting"
  value={formData.meeting} onChange={handleChange}>
  {meeting.map(meeting => (
 <option key={meeting.id} value={meeting.id}>
  Meeting: {meeting.date} : {meeting.start_time}</option> ))}
</select></label>
</div> */}
</div>
  
<div className="FOrm-container">
<div className="form-container-half">
<label className='label'>  Lesson Link: 
<input  type="text" name="Lesson_link" placeholder="Lesson Link: " value={formData.Lesson_link} onChange={handleChange} />  </label></div>  
 <div className="form-container-half">
 <label className='label'>  Material Link:  
 <input   type="text" name="material_link"placeholder="Material Link: "value={formData.material_link} onChange={handleChange}/></label></div>
</div>  
 
<div className="FOrm-container">
<div className="form-container-half">
<label className='label'> Quiz Link:
<input  type="text" name="join_Quiz" placeholder="Join Quiz:"value={formData.join_Quiz} onChange={handleChange} />
 </label>
</div>

<div className="form-container-half">
<label className='label'>  Coupon:  
 <input type="text"name="Quiz_Coupon"placeholder="Quiz Coupon: "value={formData.Quiz_Coupon} onChange={handleChange}/></label></div>
</div>
 
 
 
<div className="FOrmContainer">
<div style={{ width: '78%' }}><button className="button-form" type="submit">Save </button></div>
<div style={{ width: '20%' }}>
<button className="cancel-button" onClick={() => setShowModalEdit(false)}>  Cancel</button>
</div></div>

</form>
</div>
    </>
  );
};

export default FormUpdate;
