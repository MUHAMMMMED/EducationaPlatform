
import React, { useState } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import './Form.css';

const FormUpdateMeeting = ({ data, is_author, fetchCourse }) => {
  const [formData, setFormData] = useState({
    course_id: data.id,
    Base_id: data.Base.id,
    meeting_id: data.timeline_meeting.id,
    join_meeting_link: data.timeline_meeting.join_meeting_link,
    timeline: data.Base.timeline.id,
  });



  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/LiveCourses/UpdateLiveRoom/`, formData);
      setShowModalEdit(false);
      fetchCourse();

    } catch (error) {

    }
  };

  return (
    <>

      {is_author === true && (<button className="Group-But But-update" onClick={() => setShowModalEdit(true)}>Edit</button>)}

      {/* Edit Form Modal */}
      <div className={`modal ${showModalEdit ? 'show' : ''}`} onClick={() => setShowModalEdit(false)}>
        <form className="modal-content animate" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Edit Item</h2>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label htmlFor="date">meeting link</label>
              <input type="text" id="join_meeting_link" name="join_meeting_link" value={formData.join_meeting_link} onChange={handleChange} />
            </div>
            <div className="form-container-half">
              <label htmlFor="date">meeting room</label>
              <select id="timeline" className="select" name="timeline" value={formData.timeline} onChange={handleChange}>

                {data.timeline.map(item => (
                  <option key={item.id} value={item.id}>
                    <>Meeting:{item.meeting?.date} :{item.meeting?.start_time}  </>

                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}>
              <button className="button-form" type="submit">Save</button>
            </div>
            <div style={{ width: '20%' }}>
              <button className="cancel-button" onClick={() => setShowModalEdit(false)}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormUpdateMeeting;
