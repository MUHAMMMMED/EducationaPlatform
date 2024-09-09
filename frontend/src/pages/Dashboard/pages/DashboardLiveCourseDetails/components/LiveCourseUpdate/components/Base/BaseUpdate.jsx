import React, { useState, } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const BaseFormUpdate = ({ base, timeline, fetchCourse }) => {
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
        pixal_id: base.pixal_id,


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
                    <h2 style={{ textAlign: 'center', padding: '15px' }}>Update base</h2>

                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="gold_title">Gold Title:</label>
                            <input type="text" id="gold_title" name="gold_title" value={formData.gold_title} onChange={handleChange} />
                        </div> </div>




                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label'>Language:
                                <select className='form-Select' name="Language" value={formData.Language} onChange={handleChange}>
                                    <option value="ar">AR</option>  <option value="en">EN</option> </select></label>
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="logo">Logo:</label>
                            <input type="file" id="logo" name="logo" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="intro_video">Intro Video:</label>
                            <input type="text" id="intro_video" name="intro_video" value={formData.intro_video} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="intro_Waiting_video">Intro Waiting Video:</label>
                            <input type="text" id="intro_Waiting_video" name="intro_Waiting_video" value={formData.intro_Waiting_video} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="intro_Live_video">Intro Live Video:</label>
                            <input type="text" id="intro_Live_video" name="intro_Live_video" value={formData.intro_Live_video} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="intro_image">intro_image:</label>
                            <input type="file" id="intro_image" name="intro_image" onChange={handleChange} />
                        </div>
                    </div>
                    <br /><br />
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="title_Course_Definition">title_Course_Definition:</label>
                            <input type="text" name="title_Course_Definition" value={formData.title_Course_Definition} onChange={handleChange} placeholder="title Course Definition" />
                        </div>

                        <div className="form-container-half">
                            <label className='label' htmlFor="title_Learning_Path">title_Learning_Path:</label>
                            <input type="text" name="title_Learning_Path" value={formData.title_Learning_Path} onChange={handleChange} placeholder="Title Learning Path" />
                        </div>
                    </div>

                    <br /><br />
                    <div className="FOrm-container">
                        <div className="form-container-half">

                            <label className='label' htmlFor="author_Title">Author Title:</label>
                            <input type="text" id="author_Title" name="author_Title" value={formData.author_Title} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="author_Image">Author Image:</label>
                            <input type="file" id="author_Image" name="author_Image" onChange={handleChange} />
                        </div>
                    </div>


                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="job_title">Job Title:</label>
                            <input type="text" id="job_title" name="job_title" value={formData.job_title} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="author_Description1">Author Description 1:</label>
                            <input type="text" id="author_Description1" name="author_Description1" value={formData.author_Description1} onChange={handleChange} />
                        </div>
                    </div>


                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="author_Description2">Author Description 2:</label>
                            <input type="text" id="author_Description2" name="author_Description2" value={formData.author_Description2} onChange={handleChange} />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="author_Description3">Author Description 3:</label>
                            <input type="text" id="author_Description3" name="author_Description3" value={formData.author_Description3} onChange={handleChange} />
                        </div>
                    </div>


                    <br /><br />
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="Title_Achievements_Hour">Title Achievements Hour:</label>
                            <input type="text" name="Title_Achievements_Hour" value={formData.Title_Achievements_Hour} onChange={handleChange} placeholder="Title Achievements Hour" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="Number_Achievements_Hour">Number Achievements Hour:</label>
                            <input type="number" name="Number_Achievements_Hour" value={formData.Number_Achievements_Hour} onChange={handleChange} placeholder="Number Achievements Hour" />
                        </div>
                    </div>
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="Title_Achievements_Book">Title_Achievements_Book:</label>
                            <input type="text" name="Title_Achievements_Book" value={formData.Title_Achievements_Book} onChange={handleChange} placeholder="Title Achievements Book" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="Number_Achievements_Book">Number_Achievements_Book:</label>
                            <input type="number" name="Number_Achievements_Book" value={formData.Number_Achievements_Book} onChange={handleChange} placeholder="Number Achievements Book" />
                        </div>
                    </div>
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="Title_Achievements_Grade">Title_Achievements_Grade:</label>
                            <input type="text" name="Title_Achievements_Grade" value={formData.Title_Achievements_Grade} onChange={handleChange} placeholder="Title Achievements Grade" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="Number_Achievements_Grade">Number_Achievements_Grade:</label>
                            <input type="number" name="Number_Achievements_Grade" value={formData.Number_Achievements_Grade} onChange={handleChange} placeholder="Number Achievements Grade" />
                        </div>
                    </div>

                    <br /><br />
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="Title_CountdownHead">Title_CountdownHead:</label>
                            <input type="text" name="Title_CountdownHead" value={formData.Title_CountdownHead} onChange={handleChange} placeholder="Title CountdownHead" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="Countdown_Description">Countdown_Description:</label>
                            <input type="text" name="Countdown_Description" value={formData.Countdown_Description} onChange={handleChange} placeholder="Countdown Description" />
                        </div>
                    </div>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="Countdown_P">Countdown_P:</label>
                            <input type="text" name="Countdown_P" value={formData.Countdown_P} onChange={handleChange} placeholder="Countdown P" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="Countdown_Button">Countdown_Button:</label>
                            <input type="text" name="Countdown_Button" value={formData.Countdown_Button} onChange={handleChange} placeholder="Countdown Button" />
                        </div>
                    </div>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="sale">sale:</label>
                            <input type="text" name="sale" value={formData.sale} onChange={handleChange} placeholder="Sale" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="expired">expired:</label>
                            <input type="text" name="expired" value={formData.expired} onChange={handleChange} placeholder="Expired" />
                        </div>
                    </div>

                    <br /><br />
                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label' htmlFor="join_whatsapp_public">join_whatsapp_public:</label>
                            <input type="text" name="join_whatsapp_public" value={formData.join_whatsapp_public} onChange={handleChange} placeholder="Join Whatsapp Public" />
                        </div>
                        <div className="form-container-half">
                            <label className='label' htmlFor="join_telegram_public">join_telegram_public:</label>
                            <input type="text" name="join_telegram_public" value={formData.join_telegram_public} onChange={handleChange} placeholder="Join Telegram Public" />
                        </div>
                    </div>
                    <br /><br />
                    {/* <div className="form-container-half">
 <label htmlFor="date">meeting room</label>
 
 <select id="timeline" className="select" name="timeline" value={formData.meeting_id} onChange={handleChange}>
 <option  value=''> select meeting </option>
 {timeline && timeline.map(item => (
  <option key={item.id} value={item.id}>{item.title} </option> ))}
 
</select> </div> */}


                    <label>pixal Id:</label>
                    <input type="text" name="pixal_id" value={formData.pixal_id} onChange={handleChange} />


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

export default BaseFormUpdate;

