
import axios from 'axios';
import React, { useState } from 'react';
import Config from '../../../../../../../../../../config';
import './Form.css';

const FormUpdate = ({  meeting,fetchCourse }) => {
  const [formData, setFormData] = useState({
   
    active:meeting.active ,
    title:meeting.title ,
    student:meeting.student,
    date:meeting.date, 
    start_time:meeting.start_time,
    end_time:meeting.end_time ,
    course:meeting.course ,
    join_meeting_link:meeting.join_meeting_link ,
        
  });
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
 

 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${Config.baseURL}/meetings/update/${meeting.id}/`, formData);
      setShowModalEdit(false); 
      fetchCourse();
    } catch (error) {
      console.error('Error updating timeline:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${Config.baseURL}/meetings/delete/${meeting.id}/`);
      fetchCourse();
      setShowModalDelete(false);

    } catch (error) {
      console.error('Error deleting timeline:', error);
    }
  };

  return (
    <>
 

      <button className="Group-But But-update " onClick={() => setShowModalEdit(true)} >  Edit</button>
    <button className="Group-But But-delete " onClick={() => setShowModalDelete(true)} >Delete</button>





      {/* Delete Modal */}
      <div className={`modal ${showModalDelete ? 'show' : ''}`} id={meeting.id} onClick={() => setShowModalDelete(false)}>
        <div className="modal-contentDelete animate" onClick={(e) => e.stopPropagation()}>
          <h3>
            Are you sure you want to <strong>delete</strong> this item? <br/>
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
      <div className={`modal ${showModalEdit ? 'show' : ''}`} id={meeting.id} onClick={() => setShowModalEdit(false)}>
        <form className="modal-content animate" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Edit Item  </h2>

      
   
    <div className="FOrm-container"> 
        <input type="text" id="title"  placeholder="title"  name="title" value={formData.title} onChange={handleChange} />
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
        <input type="text" id="join_meeting_link"    placeholder="join_meeting_link"   name="join_meeting_link" value={formData.join_meeting_link} onChange={handleChange} />
      </div>      

   









   <div className="FOrm-container">
      
       <label className='label'>Active:<input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /></label>
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
