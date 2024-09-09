import React, { useEffect, useState } from 'react';
import { FaUserGraduate } from "react-icons/fa";
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
import UpdateBlock from '../UpdateBlock/UpdateBlock';
import studentImg from './Student.png';
import './styles.css';

export default function BlockList() {

    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numDisplayed, setNumDisplayed] = useState(5); // Track number of items displayed

    const fetchUser = async () => {
        try {

            const response = await AxiosInstance.get(`${Config.baseURL}/Event/session_Filter/`, {
                params: {
                    name: searchTerm,
                    start_date: startDate,
                    end_date: endDate,
                    status: status,
                }
            });
            if (response.status === 200) {
                setResults(response.data);
            }
        } catch (error) {

        }
    };

    useEffect(() => {

        fetchUser();
    }, [searchTerm, startDate, endDate, status]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDate = (event) => {
        setEndDate(event.target.value);
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
    };




    const handleViewMore = () => {
        setNumDisplayed(prevNumDisplayed => prevNumDisplayed + 10);
    };

    return (
        <div className='section_StudentsList'>
            <div class="projects">
                <div class="projects-inner">
                    <header class="Projects-header">
                        <div class="Projects-header-Title"><FaUserGraduate /> {results && results.session_count} Enrolled Students</div>
                        <div class="FleX-container">
                            <div class="div_input">
                                <input type="text" className='Search' style={{ marginLeft: '5px' }} onChange={handleSearch} placeholder="Name.." />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleStartDate} />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleEndDate} />
                                <select class="ActionBox" onChange={handleStatus} style={{ marginLeft: '5px' }}>
                                    <option value='' >Select Status</option>
                                    <option value="L">Live</option>
                                    <option value="B">Block</option>
                                </select>
                            </div>
                        </div> </header>
                    <table class="projects-table">
                        <thead><tr>
                            <th>Date</th><th>IP</th><th>Name</th><th>Status</th><th class="text-right">Actions</th>
                        </tr> </thead>
                        <tbody>
                            {results.session && results.session.slice(0, numDisplayed).map(item => (
                                <tr key={item.id}>
                                    <td><p>{item.date}</p><p></p></td>
                                    <td><p>{item.IP}</p><p></p></td>
                                    <td class="member"> <figure style={{ textAlign: 'left' }}><img alt="Student" src={studentImg} /></figure>
                                        <div class="member-info" style={{ textAlign: 'left' }}> <p>{item.name}</p><p></p> </div>  </td>

                                    <td class="status"  >
                                        <span class={`status-text ${item.status === 'L' ? 'status-green' : item.status === 'B' ? 'status-red' : ''}`}>
                                            {item.status === 'L' ? 'live' : item.status === 'B' ? 'Block' : ''}
                                        </span> </td>
                                    <UpdateBlock Id={item.id} fetchUser={fetchUser} />
                                </tr>))}
                        </tbody>
                    </table>
                    {results.users && results.users.length > numDisplayed && (
                        <div class="FleX-container"><div className='div-button'><button className='view_more' onClick={handleViewMore}>View More</button></div>
                        </div>)}
                </div></div></div>
    )
}
