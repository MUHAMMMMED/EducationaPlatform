 
import React, { useState } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
 
export default function EpisodeCreate({ item,Course,fetchCourse }) {
  const [showModalEpisodeCreate, setShowModalEpisodeCreate] = useState(false);
  const [formData, setFormData] = useState({
    SectionsId:item.id,
    course:Course.id ,
    title: '',
    description:'',
    material_link: '',
    length: '',
    video_link: '',
    video_id: '',
    is_preview: false,
    serial_number: '',
    Transcript: ''
  });
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/Courses/episodes/`, formData);
       
      setShowModalEpisodeCreate(false);
      setFormData({    
        SectionsId:item.id,
        course:Course.id ,
        title: '',
        description:'',
        material_link: '',
        length: '',
        video_link: '',
        video_id: '',
        is_preview: false,
        serial_number: '',
        Transcript: ''});
      fetchCourse();
     
    } catch (error) {
     
    }
  };
 
  if (item === null) {
    fetchCourse();
  }
  const handleCloseModal = () => {
    setShowModalEpisodeCreate(false);
  };
 
  return (
    <>
 
     <div style={{ float: 'left', width: '65px', marginRight: '15px' }}onClick={() => setShowModalEpisodeCreate(true)} ><span className='onLine-icon'><IoCreateOutline /></span></div>
 
 
      <div className={`modal ${showModalEpisodeCreate ? 'show' : ''}`}>
        <form className="modal-content animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 style={{ textAlign: 'center', padding: '15px' }}>  Episode Create</h2>
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="title">Title :</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
          </div> 
 
          <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
              <label className='label' htmlFor="description">Description :</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="description" />
            </div>
          </div> 
 
          <div className="FOrm-container">
          <div className="form-container-half" > 
          <label>Video Link :</label>
          <input type="text" name="video_link" value={formData.video_link} onChange={handleChange} />
          </div>
          <div className="form-container-half" > 
          <label>Video ID :</label>
          <input type="text" name="video_id" value={formData.video_id} onChange={handleChange} />
          </div></div>

         <div className="FOrm-container">
         <div className="form-container-half" > 
         <label>Material Link :</label>
         <input type="text" name="material_link" value={formData.material_link} onChange={handleChange} />
         </div>
         <div className="form-container-half" > 
         <label>Length :</label>
         <input type="number" name="length" value={formData.length} onChange={handleChange} />
         </div></div>
  
            <div className="FOrm-container">
            <div className="form-container-half" style={{ width: '100%' }}>
            <label>Transcript :</label>
            <textarea name="Transcript" value={formData.Transcript}  style={{height:'200px'}}onChange={handleChange} />
            </div></div>
 
            <div className="FOrm-container">
            <div className="form-container-half"  > 
            <label>Serial Number :</label>
            <input type="number" name="serial_number" value={formData.serial_number} onChange={handleChange} />
            </div>
            <div className="form-container-half" > 
            <label> Is Preview :
            <input type="checkbox" name="is_preview" checked={formData.is_preview} onChange={handleChange} />
            </label></div>
            </div>
 
          <br /><br />
          {/* Form buttons */}
          <div className="FOrmContainer">
            <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button></div>
          </div>
        </form>
      </div>
    </>
  );
} 


   