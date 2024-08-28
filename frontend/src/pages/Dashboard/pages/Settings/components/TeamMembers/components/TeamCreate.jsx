import React, { useState } from 'react';
import Config from '../../../../../../../config';
import AxiosInstance from '../../../../../../../desing-system/Authentication/AxiosInstance';

const TeamCreate = ({ user, fetchDate }) => {
    const [formData, setFormData] = useState({
        teacher: '',  // Initialize student as an empty string
    });

    const [showModalTeamCreate, setShowModalTeamCreate] = useState(false);

    const handleStudentSelection = (event) => {
        setFormData({ ...formData, teacher: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.post(`${Config.baseURL}/home/team/`, formData);
            setFormData({ teacher: '' }); // Reset student value after submission
            setShowModalTeamCreate(false);
            fetchDate();
        } catch (error) {
            // Handle error
        }
    };

    const handleCloseModal = () => {
        setShowModalTeamCreate(false);
    };

    return (
        <>
            <button className="Open_button" onClick={() => setShowModalTeamCreate(true)}>Create</button>
            <div className={`modal ${showModalTeamCreate ? 'show' : ''}`}>
                <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2 style={{ textAlign: 'center', padding: '15px' }}>Create</h2>
                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="student">Team Members:</label>
                            <select className="Action-Box" style={{ width: '98%', marginTop: '5px' }} onChange={handleStudentSelection} value={formData.student}>
                                <option value=''>Select user</option>
                                {user.map(stu => (
                                    <option value={stu.id} key={stu.id}>
                                        {stu?.user_full_name}
                                    </option>
                                ))}
                            </select>
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

export default TeamCreate;
