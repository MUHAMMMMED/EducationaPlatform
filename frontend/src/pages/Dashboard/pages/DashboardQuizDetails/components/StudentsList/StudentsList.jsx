import React, { useEffect, useState } from 'react';
import { FaDownload, FaUserGraduate } from "react-icons/fa";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import studentImg from './Student.png';
import CounterButton from './components/CounterButton/CounterButton';
import './styles.css';

export default function StudentsList({ Id }) {

    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numDisplayed, setNumDisplayed] = useState(5);
    const fetchUser = async () => {
        try {
            if (!Id) return;
            const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/user_Filter/${Id}/`, {
                params: {
                    query: searchTerm,
                    start_date: startDate,
                    end_date: endDate,

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
    }, [searchTerm, startDate, endDate]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDate = (event) => {
        setEndDate(event.target.value);
    };




    // Function to download data
    const downloadData = async () => {
        try {
            if (!Id) return
            const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/download_users_data/${Id}`, {
                responseType: 'blob' // Set response type to blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'enrolled_Quiz_students.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {

        }
    };
    const handleViewMore = () => {
        setNumDisplayed(prevNumDisplayed => prevNumDisplayed + 10); // Increment by 10 when "View More" button is clicked
    };

    // Function to format date from "2024-09-04T00:35:16.398467+03:00" to a readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };



    return (
        <div className='section_StudentsList'>
            <div class="projects">
                <div class="projects-inner">
                    <header class="Projects-header">
                        <div class="Projects-header-Title"><FaUserGraduate /> {results && results.user_count} Enrolled Students</div>
                        <div class="FleX-container">
                            <div class="div_input">
                                <input type="text" className='Search' style={{ marginLeft: '0px' }} onChange={handleSearch} placeholder="Search.." />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleStartDate} />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleEndDate} />
                                <div style={{ marginLeft: '5px' }} onClick={downloadData} class="FaDow"><FaDownload /> </div>
                            </div>
                        </div> </header>
                    <table class="projects-table">
                        <thead><tr>
                            <th>Date</th><th>Email</th> <th>Student</th><th>Paid</th><th>tries</th><th class="text-right">chaing tries  </th>
                        </tr> </thead>
                        <tbody>
                            {results.users && results.users.slice(0, numDisplayed).map(item => (
                                <tr key={item.id}>
                                    <td><p>  {formatDate(item.date)}  </p><p></p></td>

                                    <td><p>{item.student.email}</p><p></p></td>
                                    <td class="member"> <figure style={{ textAlign: 'left' }}><img alt="Student" src={studentImg} /></figure>
                                        <div class="member-info" style={{ textAlign: 'left' }}> <p>{item.student.user_full_name}</p><p></p> </div>  </td>
                                    <td><p></p><p>${item.Paid}</p></td>
                                    <td><p></p><p> {item.tries}</p></td>
                                    <td>  <CounterButton Id={item.id} tries={item.tries} fetchUser={fetchUser} /> </td>
                                </tr>))}
                        </tbody> </table>
                    {results.users && results.users.length > numDisplayed && (
                        <div class="FleX-container"><div className='div-button'><button className='view_more' onClick={handleViewMore}>View More</button></div>
                        </div>)}</div></div></div>
    )
}
