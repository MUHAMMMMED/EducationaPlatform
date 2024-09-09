
import React, { useState } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';

const FormUpdate = ({ data, fetchCourse }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [formData, setFormData] = useState({
    join_telegram: data.join_telegram,
    join_whatsapp: data.join_whatsapp,
    waitingDate: data.waitingDate,
    time: data.time,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put(`${Config.baseURL}/LiveCourses/live-courses/${data.id}/`, formData);
      fetchCourse();
      setShowModalEdit(false);
    } catch (error) {

    }
  };

  return (
    <>
      <div className="Container-Button">
        <div className="ContaineR-Edit">
          <button className="Edit-button" onClick={() => setShowModalEdit(true)}>
            Edit
          </button>
        </div>
      </div>

      <div className={`modal ${showModalEdit ? 'show' : ''}`} onClick={() => setShowModalEdit(false)}>
        <form className="modal-content animate" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: 'center', padding: '15px' }}> </h2>

          <div className="FOrm-container">
            <div className="form-container-half">

              <label className='label'> Telegram Link:  </label>

              <textarea
                name="join_telegram"
                placeholder="join_telegram"
                value={formData.join_telegram}
                onChange={handleChange}
              />
            </div>
            <div className="form-container-half">
              <label className='label'> Whatsap Link:  </label>

              <textarea
                name="join_whatsapp"
                placeholder="join_whatsapp Link:"
                value={formData.join_whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="FOrm-container">
            <div className="form-container-half">
              <label className='label'> waiting Date:  </label>

              <input
                type="date"
                name="waitingDate"
                placeholder="waitingDate:"
                value={formData.waitingDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-container-half">
              <label className='label'> Time:  </label>

              <input
                type="time"
                name="time"
                placeholder="Time:"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
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
