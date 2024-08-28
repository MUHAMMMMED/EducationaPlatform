import React, { useState } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import './Form.css';

const FormCreateMeeting = ({ data,fetchCourse }) => {
  const [formData, setFormData] = useState({
    course_id: data.id,
    Base_id: data.Base.id,
    meeting_id: '',
    join_meeting_link: '',
    timeline:'' ,
  });

  

  const [showModalCreate, setShowModalCreate] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    if (name === 'timeline') {
      // Extract meeting_id from the selected option
      const selectedOption = e.target.options[e.target.selectedIndex];
      const meetingId = selectedOption.dataset.meetingId;
      setFormData({ ...formData, [name]: val, meeting_id: meetingId });
    } else {
      setFormData({ ...formData, [name]: val });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/CreateLiveRoom/`, formData);
      setShowModalCreate(false);
      setFormData({course_id:data.id,timeline:'', meeting_id: '', join_meeting_link: '', });
   
      fetchCourse();

    } catch (error) {
   
    }
  };

  return (
    <>
 <button className="Group-But But-update" onClick={() => setShowModalCreate(true)}>Create</button>
 {/* Edit Form Modal */}
 <div className={`modal ${showModalCreate ? 'show' : ''}`} onClick={() => setShowModalCreate(false)}>
 <form className="modal-content animate" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
 <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Item</h2>
 <div className="FOrm-container">
 <div className="form-container-half">
 <label htmlFor="date">meeting link</label>
 <input type="text" id="join_meeting_link" name="join_meeting_link" value={formData.join_meeting_link} onChange={handleChange} />
 </div>
 <div className="form-container-half">
 <label htmlFor="date">meeting room</label>
 
<select id="timeline" className="select" name="timeline" value={formData.meeting_id} onChange={handleChange}>
  {data.timeline.map(item => (
    <option key={item.id} value={item.id} data-meeting-id={item.meeting.id}>
      Meeting: {item.meeting.date} : {item.meeting.start_time}
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
              <button className="cancel-button" onClick={() => setShowModalCreate(false)}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCreateMeeting;
