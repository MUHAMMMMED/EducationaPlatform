import React, { useState } from 'react';
import Config from '../../../../config';
import './NewAsk.css';

import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
export default function NewAsk({ data, fetchCourse }) {
  const [formData, setFormData] = useState({
    course: data.id,
    content: '',
    status: 'waiting',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/ask/create/`, formData);

      fetchCourse();
      setFormData({ ...formData, content: '' });
    } catch (error) {

    }
  };


  return (
    <div className="contentContainer">
      <form onSubmit={handleSubmit}>
        <div className="boxContainer">
          <textarea
            className="messageBox"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Ask questions and get answers ...."
          ></textarea>
          <button type="submit" className="postButton">
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}

