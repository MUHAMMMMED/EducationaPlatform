import React, { useState, } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const UpdatTimelineMeetingForm = ({ base, timeline, fetchCourse }) => {
    const [showModalBaseUpdate, setShowModalBaseUpdate] = useState(false);
    const [formData, setFormData] = useState({
        Language: base.Language,
        course: base.course,
        logo: null, // Keep the logo as null if you don't want to update it
        gold_title: base.gold_title,
        intro_video: base.intro_video,
        intro_Waiting_video: base.intro_Waiting_video,
        intro_Live_video: base.intro_Live_video,
        intro_image: base.intro_image,
        author_Title: base.author_Title,
        job_title: base.job_title,
        author_Image: null, // Keep the author image as null if you don't want to update it
        author_Description1: base.author_Description1,
        author_Description2: base.author_Description2,
        author_Description3: base.author_Description3,
        Title_Achievements_Hour: base.Title_Achievements_Hour,
        Number_Achievements_Hour: base.Number_Achievements_Hour,
        Title_Achievements_Book: base.Title_Achievements_Book,
        Number_Achievements_Book: base.Number_Achievements_Book,
        Title_Achievements_Grade: base.Title_Achievements_Grade,
        Number_Achievements_Grade: base.Number_Achievements_Grade,
        title_Learning_Path: base.title_Learning_Path,
        Title_CountdownHead: base.Title_CountdownHead,
        Countdown_Description: base.Countdown_Description,
        Countdown_Button: base.Countdown_Button,
        Countdown_P: base.Countdown_P,
        timeline: base.timeline,
        expired: base.expired,
        sale: base.sale,
        timeline: '',
        join_telegram_public: base.join_telegram_public,
        join_whatsapp_public: base.join_whatsapp_public,
        title_Course_Definition: base.title_Course_Definition,


    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const val = type === 'file' ? files[0] : value;
        setFormData({ ...formData, [name]: val });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            for (const key in formData) {
                // Check if the current field is a file input and if it's empty or not a File object
                if (formData[key] instanceof File && formData[key]) {
                    formDataObj.append(key, formData[key]);
                } else if (key !== 'logo' && key !== 'intro_image' && key !== 'author_Image') {
                    formDataObj.append(key, formData[key]);
                }
            }
            await AxiosInstance.put(`${Config.baseURL}/LiveCourses/base/${base.id}/`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Close the modal, fetch the course, and perform any other actions
            setShowModalBaseUpdate(false);
            fetchCourse();
        } catch (error) {
            // Handle errors if needed
            console.error('Error updating base:', error);
        }
    };


    const handleCloseModal = () => {
        setShowModalBaseUpdate(false);
    };

    return (
        <>
            <button onClick={() => setShowModalBaseUpdate(true)} className="Creat_button">Update</button>
            <div className={`modal ${showModalBaseUpdate ? 'show' : ''}`}>
                <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2 style={{ textAlign: 'center', padding: '15px' }}>Update  Timeline Meeting  </h2>



                    <label htmlFor="date">meeting room</label>

                    <select id="timeline" className="select" name="timeline" value={formData.meeting_id} onChange={handleChange}>
                        <option value=''> select meeting </option>
                        {timeline && timeline.map(item => (
                            <option key={item.id} value={item.id}>{item.title} </option>))}

                    </select>


                    {/* Form buttons */}
                    <div className="FOrmContainer">
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default UpdatTimelineMeetingForm;

