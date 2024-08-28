 
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const RateCreate = ({ user, fetchDate }) => {
    const [formData, setFormData] = useState({
        message: '',
        rate_number: '',
        student: '',  
    });

 
    const [showModalRateCreate, setShowModalRateCreate] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleStudentSelection = (event) => {
      setFormData({ ...formData, student: event.target.value });  
  };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.post(`${Config.baseURL}/home/rate/`, formData);
            setFormData({ message: '', rate_number: '', student: '' });
            setShowModalRateCreate(false);
            fetchDate();
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
                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="message">message:</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} style={{height:'50px'}} placeholder="message..." />
                        </div>
                    </div>
                    <div className="FOrm-container">
                        <div className="form-container-half" style={{ width: '100%' }}>
                            <label className='label' htmlFor="message">rate_number:</label>
                            <input type="number" name="rate_number" value={formData.rate_number} onChange={handleChange} placeholder="rate number 1 : 5" />
                        </div>
                    </div>
                    <br /><br/>
                    <div className="FOrmContainer">
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RateCreate;