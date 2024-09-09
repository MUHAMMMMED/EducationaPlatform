import React, { useState } from 'react';
import Config from '../../../../../../../config';
import AxiosInstance from '../../../../../../../desing-system/Authentication/AxiosInstance';

function CouponCodeForm({ Id, fetchCouponCodes }) {
  const [formData, setFormData] = useState({
    course: Id,
    Code: '',
    date: '',
    Enroll: '1',
    discount: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/live-course-coupon-codes-create/`, formData);
      // After successfully adding a new course definition, refresh the list
      fetchCouponCodes();
      setShowModal(false);
      // Clear the form fields after successful submission
      setFormData({
        course: Id,
        Code: '',
        date: '',
        Enroll: '1',
        discount: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="Creat_button">Create New</button>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Coupon Code</h2>
          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'> Coupon Code:
                <input type="text" name="Code" placeholder="Coupon Code" value={formData.Code} onChange={handleChange} />
              </label>
            </div>
            <div className="form-container-half">
              <label className='label'> Discount:
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
              </label>
            </div>
          </div>

          <label className='label'> Expiry Date::
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>


          <div className="FOrm-container">
            <label className='label' style={{ width: '100%' }}> Enroll :
              <input type="number" name="Enroll" value={formData.Enroll} onChange={handleChange} /></label>
          </div>


          <div className="FOrmContainer" style={{ marginTop: '50px' }}>
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CouponCodeForm;
