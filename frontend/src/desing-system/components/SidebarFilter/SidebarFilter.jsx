import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Config from '../../../config';
import CoursesCard from '../Filter/components/CoursesCard/CoursesCard';
import ExamCard from '../Filter/components/ExamCard/ExamCard';
import LiveCoursesCard from '../Filter/components/LiveCoursesCard/LiveCoursesCard';
import './SidebarFilter.css';

function SidebarFilter() {
    const [data, setData] = useState({ categories: [], levels: [], instructors: [] });
    const [results, setResults] = useState({ courses: [], live_courses: [], exams: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [checkCategories, setCheckCategories] = useState([]);
    const [checkInstructors, setCheckInstructors] = useState([]);
    const [levelChange, setLevelChange] = useState([]);
    const [priceChange, setPriceChange] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => { setShowSidebar(!showSidebar); };

    useEffect(() => {
        const handleResize = () => { setShowSidebar(window.innerWidth >= 1200); };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${Config.baseURL}/Query/filter_value/`);

                if (response.status !== 200) {
                    throw new Error();
                }
                setData(response.data.results);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${Config.baseURL}/Query/filter-courses/`, {
                    params: {
                        query: searchTerm,
                        category: checkCategories.join(','),
                        instructor: checkInstructors.join(','),

                        level: levelChange.join(','),
                        price: priceChange.join(',')
                    }
                });
                setResults(response.data);

                if (response.status !== 200) {
                    throw new Error();
                }
            } catch (error) {

            }
        };

        fetchCourses();
    }, [searchTerm, checkCategories, checkInstructors, levelChange, priceChange]);

    const handleSearch = (event) => { setSearchTerm(event.target.value); };


    const handleLevelChange = (selectedLevel) => {

        if (levelChange.includes(selectedLevel)) {
            setLevelChange(levelChange.filter(l => l !== selectedLevel));

        } else {
            setLevelChange([...levelChange, selectedLevel]);

        }
    };

    const handlePriceChange = (selectedPrice) => {

        if (priceChange.includes(selectedPrice)) {
            setPriceChange(priceChange.filter(p => p !== selectedPrice));

        } else { setPriceChange([...priceChange, selectedPrice]); }

    };

    const handleCategoryCheckboxChange = (categoryId) => {

        if (checkCategories.includes(categoryId)) {
            setCheckCategories(checkCategories.filter(id => id !== categoryId));

        } else { setCheckCategories([...checkCategories, categoryId]); }
    };



    const handleInstructorCheckboxChange = (instructorId) => {

        if (checkInstructors.includes(instructorId)) {
            setCheckInstructors(checkInstructors.filter(id => id !== instructorId));

        } else { setCheckInstructors([...checkInstructors, instructorId]); }

    };

    return (
        <div className='filter-section'>
            {showSidebar && (
                <aside className="sidebar">
                    <div className="content-wrapper">
                        <div className="widget">
                            <div className="widget-title"> Category </div>
                            <div className="collapse show"  >
                                <div className="CArd card-body">
                                    {data.categories.map(cat => (
                                        <div className="checkbox-item" key={cat.id}>
                                            <div className='checkbox-input'>
                                                <input id={`checkbox-${cat.id}`} type="checkbox" onChange={() => handleCategoryCheckboxChange(cat.id)} checked={checkCategories.includes(cat.id)} /></div>
                                            <div className='checkbox-label'>
                                                <label htmlFor={`checkbox-${cat.id}`}>
                                                    <div className='space'>{cat.title}</div> </label></div> </div>))}

                                </div></div></div>

                        <div className="widget">
                            <div className="widget-title" >  Instructors </div>
                            <div className="collapse show" >
                                <div className="CArd card-body">

                                    {data.instructors.map(inst => (
                                        <div className="checkbox-item" key={inst.id}>
                                            <div className='checkbox-input'>
                                                <input id={`checkbox-${inst.id}`} type="checkbox" onChange={() => handleInstructorCheckboxChange(inst.id)} checked={checkInstructors.includes(inst.id)} /></div>
                                            <div className='checkbox-label'>
                                                <label htmlFor={`checkbox-${inst.id}`}>
                                                    <div className='space'>{inst.user_full_name}</div></label>   </div></div>))}
                                </div></div></div>

                        <div className="widget">
                            <div className="widget-title">  Price </div>
                            <div className="collapse show"  >
                                <div className="CArd card-body">

                                    <div className="checkbox-item">
                                        <div className='checkbox-input'>
                                            <input id="checkbox-All" type="checkbox" onChange={() => handlePriceChange('All')} /></div>
                                        <div className='checkbox-label'>
                                            <label ><div className='space'>All</div></label></div> </div>

                                    <div className="checkbox-item">
                                        <div className='checkbox-input'>
                                            <input id="checkbox-FREE" type="checkbox" onChange={() => handlePriceChange('FREE')} /></div>
                                        <div className='checkbox-label'>
                                            <label > <div className='space'>FREE</div> </label> </div></div>

                                    <div className="checkbox-item">
                                        <div className='checkbox-input'>
                                            <input id="checkbox-Paid" type="checkbox" onChange={() => handlePriceChange('Paid')} /></div>
                                        <div className='checkbox-label'>
                                            <label ><div className='space'>Paid</div></label>
                                        </div> </div></div>


                                <div className="widget">
                                    <div className="widget-title"  >  Level </div>
                                    <div className="collapse show"  >
                                        <div className="CArd card-body">

                                            {data.levels.map(lvl => (
                                                <div className="checkbox-item" key={lvl}>
                                                    <div className='checkbox-input'>
                                                        <input id={`checkbox-${lvl}`} type="checkbox" onChange={() => handleLevelChange(lvl)} checked={levelChange.includes(lvl)} />  </div>
                                                    <div className='checkbox-label'>
                                                        <label htmlFor={`checkbox-${lvl}`}>
                                                            <div className='space'> {lvl}</div>
                                                        </label>
                                                    </div></div>))}
                                        </div> </div>

                                </div></div></div>
                    </div></aside>)}

            <div className="card-list">
                <div className="widget-input">
                    <div className="widget-center">
                        <div className='button-center'><button className="filter-button" onClick={toggleSidebar}> <FaFilter className="filter-icon" /> Filter  </button>   </div>
                        <div className='button-center1'><input className='Search' type="text" onChange={handleSearch} value={searchTerm} placeholder="Search your course" /></div>
                    </div></div>

                <div className='list'>
                    {results.live_courses.map(liveCourse => (<LiveCoursesCard key={liveCourse.id} course={liveCourse} />))}
                    {results.courses.map(course => (<CoursesCard key={course.id} course={course} />))}
                    {results.exams.map(exam => (<ExamCard key={exam.id} exam={exam} />))}
                </div> </div></div>
    );
}
export default SidebarFilter;
