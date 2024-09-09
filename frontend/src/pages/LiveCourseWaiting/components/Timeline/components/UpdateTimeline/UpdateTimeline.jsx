import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../../../../config';

export default function UpdateTimeline({ data }) {
    const [timelines, setTimelines] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        active: true,
        index: '',
        join_meeting: '',
        material_link: '',
        join_Course: '',
        Course_Coupon: '',
        join_Quiz: '',
        Quiz_Coupon: '',
        date: '',
        time: '',
        Lesson_link: '',
        complete: true,
    });



    useEffect(() => {
        fetchTimelines();
    }, []);

    const fetchTimelines = async () => {
        try {
            const response = await axios.get(`${Config.baseURL}/timeline/${id}/`);
            setTimelines(response.data);
        } catch (error) {
            console.error('Error fetching timelines:', error);
        }
    };

    // const handleCreateTimeline = async () => {
    //   try {
    //     const response = await axios.post(`${Config.baseURL}/timeline/`, formData);
    //     setTimelines([...timelines, response.data]);
    //     setFormData({
    //       // Reset formData state after successful creation
    //     });
    //   } catch (error) {
    //     console.error('Error creating timeline:', error);
    //   }
    // };

    // const handleUpdateTimeline = async (id, newData) => {
    //   try {
    //     const response = await axios.put(`${Config.baseURL}/timeline/${id}/`, newData);
    //     const updatedTimelines = timelines.map((timeline) =>
    //       timeline.id === id ? response.data : timeline
    //     );
    //     setTimelines(updatedTimelines);
    //   } catch (error) {
    //     console.error('Error updating timeline:', error);
    //   }
    // };

    // const handleDeleteTimeline = async (id) => {
    //   try {
    //     await axios.delete(`${Config.baseURL}/timeline/${id}/`);
    //     setTimelines(timelines.filter((timeline) => timeline.id !== id));
    //   } catch (error) {
    //     console.error('Error deleting timeline:', error);
    //   }
    // };



    const clearFormData = () => {
        setFormData({
            title: '',
            description: '',
            active: true,
            index: '',
            join_meeting: '',
            material_link: '',
            join_Course: '',
            Course_Coupon: '',
            join_Quiz: '',
            Quiz_Coupon: '',
            date: '',
            time: '',
            Lesson_link: '',
            complete: true,
        });
    };

    return (
        <div>
            <h2>{data ? 'Update Timeline' : 'Create Timeline'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Date"
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="Time"
                />
                <input
                    type="text"
                    name="index"
                    value={formData.index}
                    onChange={handleChange}
                    placeholder="Index"
                />
                <textarea
                    name="join_meeting"
                    value={formData.join_meeting}
                    onChange={handleChange}
                    placeholder="Join Meeting"
                />
                <textarea
                    name="material_link"
                    value={formData.material_link}
                    onChange={handleChange}
                    placeholder="Material Link"
                />
                <textarea
                    name="join_Course"
                    value={formData.join_Course}
                    onChange={handleChange}
                    placeholder="Join Course"
                />
                <input
                    type="text"
                    name="Course_Coupon"
                    value={formData.Course_Coupon}
                    onChange={handleChange}
                    placeholder="Course Coupon"
                />
                <textarea
                    name="join_Quiz"
                    value={formData.join_Quiz}
                    onChange={handleChange}
                    placeholder="Join Quiz"
                />
                <input
                    type="text"
                    name="Quiz_Coupon"
                    value={formData.Quiz_Coupon}
                    onChange={handleChange}
                    placeholder="Quiz Coupon"
                />
                <textarea
                    name="Lesson_link"
                    value={formData.Lesson_link}
                    onChange={handleChange}
                    placeholder="Lesson Link"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={handleChange}
                        name="active"
                    />{' '}
                    Active
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        checked={formData.complete}
                        onChange={handleChange}
                        name="complete"
                    />{' '}
                    Complete
                </label>
                <br />
                <button type="submit">{data ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}
