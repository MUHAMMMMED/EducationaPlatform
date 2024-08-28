 
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const LiveCourseRateCreate = ({ liveCourses, fetchCourse }) => {
    const [formData, setFormData] = useState({
        message: '',
        rate_number: '',
        course: liveCourses.id,
        student: '',  
    });

    const [showModalRateCreate, setShowModalRateCreate] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleStudentSelection = (event) => {
      setFormData({ ...formData, student: event.target.value }); // Update student in formData
  };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.post(`${Config.baseURL}/LiveCourses/live-course-rates/`, formData);
            setFormData({ message: '', rate_number: '', course: liveCourses.id, student: '' });
            setShowModalRateCreate(false);
            fetchCourse();
        } catch (error) {
       
        }
    };

    const handleCloseModal = () => {
        setShowModalRateCreate(false);
    };

    return (
        <>
            <button className="Open_button" onClick={() => setShowModalRateCreate(true)}>Create</button>
            <div className={`modal ${showModalRateCreate ? 'show' : ''}`}>
                <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2 style={{ textAlign: 'center', padding: '15px' }}>Rate Create</h2>
                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="student">student:</label>
                            <select className="Action-Box" style={{ width: '98%', marginTop: '5px' }} onChange={handleStudentSelection} value={formData.student.id}>
                                <option value=''>Select student</option>
                                {liveCourses.student && liveCourses.student.map(stu => (
                                    <option value={stu.student.id} key={stu.id}>{stu.student.user_full_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br /><br />
                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="message">message:</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="message..." />
                        </div>
                    </div>
                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="message">rate_number:</label>
                            <input type="number" name="rate_number" value={formData.rate_number} onChange={handleChange} placeholder="rate number 1 : 5" />
                        </div>
                    </div>
                    <br /><br />
                    <div className="FOrmContainer">
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LiveCourseRateCreate;