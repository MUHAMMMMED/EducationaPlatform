
import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

const FormCreate = ({ data, fetchCourse }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        active: true,
        index: '',
        course: data.id,
        meeting: '',
        join_meeting: '',
        material_link: '',
        join_Course: '',
        Course_Coupon: '',
        join_Quiz: '',
        Quiz_Coupon: '',
        date: '',
        time: '',
        Lesson_link: '',
        complete: true,
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        AxiosInstance.post(`${Config.baseURL}/LiveCourses/create_timeline/`, formData)
            .then(() => { setShowModal(false); fetchCourse(); })
            .catch(error => { });


    };

    return (
        <div>
            <button className="Edit-button" onClick={() => setShowModal(true)}>Create</button>
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <form className="modal-content animate" onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', padding: '15px' }}>Create New</h2>
                    <div className="form-container">
                        <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} /></div>
                    <div className="form-container"><textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} /></div>
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <select id="meeting" className="select" name="meeting" value={formData.meeting} onChange={handleChange}>
                                <option value="">Select Meeting</option>
                                {data.meeting.map(meeting => (
                                    <option key={meeting.id} value={meeting.id}>Meeting: {meeting.date} : {meeting.start_time}</option>))}</select></div>
                        <div className="form-container-half">
                            <textarea name="join_meeting" placeholder="Join Zoom Meeting" value={formData.join_meeting} onChange={handleChange} /></div>
                    </div>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <textarea name="join_Course" placeholder="Join Course" value={formData.join_Course} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <input type="text" name="Course_Coupon" placeholder="Course Coupon" value={formData.Course_Coupon} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="FOrm-container">

                        <div className="form-container-half">
                            <textarea name="join_Quiz" placeholder="Join Quiz" value={formData.join_Quiz} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <input type="text" name="Quiz_Coupon" placeholder="Quiz Coupon" value={formData.Quiz_Coupon} onChange={handleChange} />
                        </div></div>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <textarea name="material_link" placeholder="Material Link" value={formData.material_link} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <textarea name="Lesson_link" placeholder="Lesson Link" value={formData.Lesson_link} onChange={handleChange} />
                        </div>  </div>
                    <div className="form-container">
                        <input type="number" name="index" placeholder="Index" value={formData.index} onChange={handleChange} />
                    </div>

                    <div className="FOrmContainer">
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button> </div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button>  </div>

                    </div>

                </form>
            </div></div>
    );
};

export default FormCreate;
