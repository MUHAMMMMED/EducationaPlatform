
import React, { useState } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';

export default function Reply({ ItemId, fetchCourse, course, is_author }) {
  const [formData, setFormData] = useState({
    course: course,
    parent_comment: ItemId,
    content: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/LiveCourses/reply/create/`, formData);
      fetchCourse();
      setFormData({ ...formData, content: '' });

    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`${Config.baseURL}/LiveCourses/ask/delete/${ItemId}/`);
      fetchCourse();
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="reply-container">
          <textarea
            type="text"
            className="reply-input"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write a reply..." />
          <button type="submit" className="reply-button">Reply</button>
        </div></form>
      <div className="post-buttoncontener">
        <br /> {is_author === true && <button className="post-button" onClick={handleDelete}>Delete</button>}
      </div>
    </>
  );
}
