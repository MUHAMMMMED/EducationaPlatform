 
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';

const ReviewCreate = ({ courseId, fetchCourse }) => {
  const [showModalReviewCreate, setShowModalReviewCreate] = useState(false);

    const [formData, setFormData] = useState({
        course: courseId,
        image: null, // This will be populated with the selected image file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            formDataObj.append('course', formData.course);
            formDataObj.append('image', formData.image);
            
            await AxiosInstance.post(`${Config.baseURL}/Courses/review_list/`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Fetch reviews again to update the list
            fetchCourse();
            setShowModalReviewCreate(false); 
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };
    const handleCloseModal = () => { setShowModalReviewCreate(false);  };

    return (
      <>

      <button onClick={() => setShowModalReviewCreate(true)} className="Creat_button">Create</button>
      <div className={`modal ${showModalReviewCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>Review Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
            <label htmlFor="image">Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />
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

export default ReviewCreate;
 