
import React, { useEffect, useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const SpeakerCreate = ({ Course, fetchCourse }) => {
  const [formData, setFormData] = useState({
    course: Course.id,
    teacher: '',
    description: '',
  });

  const [results, setResults] = useState([]);
  const [showModalSpeakerCreate, setShowModalSpeakerCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Query/filter_value/`);
        if (response.status !== 200) {
          throw new Error();
        }
        setResults(response.data.results); // Change setData to setResults
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleInstructorsSelection = (event) => {
    setFormData({ ...formData, teacher: event.target.value }); // Update teacher in formData
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Courses/speaker/`, formData);

      // Clear form data after successful submission
      setFormData({ course: Course.id, teacher: '', description: '', });


      setShowModalSpeakerCreate(false);
      fetchCourse();
      // Handle any other actions after successful submission, such as showing a success message
    } catch (error) {
      console.error('Error creating speaker:', error);
      // Handle error responses, such as showing an error message to the user
    }
  };
  const handleCloseModal = () => {
    setShowModalSpeakerCreate(false);
  };

  return (
    <>

      <button className="Open_button" onClick={() => setShowModalSpeakerCreate(true)}>Create</button>

      <div className={`modal ${showModalSpeakerCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Speaker Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="Teacher">Teacher:</label>
              <select className="Action-Box" style={{ width: '98%', marginTop: '5px' }} onChange={handleInstructorsSelection} value={formData.Teacher}>
                <option value=''>Select Teacher</option>
                {results.instructors && results.instructors.map(inst => (
                  <option value={inst.id} key={inst.id}>{inst.user_full_name}</option>))} </select>

            </div>
          </div><br /><br />
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="description">description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="description..." />
            </div>
          </div><br /><br />
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

export default SpeakerCreate;
