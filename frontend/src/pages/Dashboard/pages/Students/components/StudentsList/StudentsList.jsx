
import React, { useEffect, useState } from 'react';
import { FaDownload, FaUserGraduate } from "react-icons/fa";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import UserUpdateForm from '../../../Teacher/components/UserUpdateForm/UserUpdateForm';
import UpdateUserTyp from '../UpdateUserTyp/UpdateUserTyp';
import studentImg from './Student.png';
import './styles.css';

export default function StudentsList() {
    const [results, setResults] = useState({ users: [], user_count: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numDisplayed, setNumDisplayed] = useState(5);

    const fetchUser = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/dashboard/student_Filter/`, {
                params: { query: searchTerm, start_date: startDate, end_date: endDate, email: email }
            });
            if (response.status === 200) {
                setResults(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [searchTerm, startDate, endDate, email]);

    const handleSearch = (event) => setSearchTerm(event.target.value);
    const handleStartDate = (event) => setStartDate(event.target.value);
    const handleEndDate = (event) => setEndDate(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleViewMore = () => setNumDisplayed(prevNumDisplayed => prevNumDisplayed + 10);

    const userTypeMap = {
        'S': 'Student',
        'T': 'Teacher',
        'M': 'Manager'
    };

    // Function to download data
    const downloadData = async () => {
        try {

            const response = await AxiosInstance.get(`${Config.baseURL}/dashboard/download_users/`, {
                responseType: 'blob' // Set response type to blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Users.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {

        }
    };


    return (
        <div className='section_StudentsList'>
            <div class="projects">
                <div class="projects-inner">
                    <header class="Projects-header">
                        <div class="Projects-header-Title"><FaUserGraduate /> {results.user_count}   Students</div>
                        <div class="FleX-container">
                            <div class="div_input">
                                <input type="text" className='Search' style={{ marginLeft: '5px' }} onChange={handleSearch} placeholder="Search.." />
                                <input type="text" className='Search' style={{ marginLeft: '5px' }} onChange={handleEmail} placeholder="Email.." />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleStartDate} />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleEndDate} />
                                <div class="FaDow" onClick={downloadData} style={{ marginLeft: '5px' }}><FaDownload /> </div>
                            </div>
                        </div>
                    </header>
                    <table class="projects-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th> Phone  </th>
                                <th>Email</th>
                                <th>Student</th>
                                <th>User Type</th>
                                <th class="text-right">Actions</th>
                                <th>Update User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.users.slice(0, numDisplayed).map(user => (
                                <tr key={user.id}>
                                    <td><p>{new Date(user.date_joined).toLocaleDateString()}</p><p></p></td>
                                    <td><p>{user.phone}</p><p></p></td>
                                    <td><p>{user.email}</p><p></p></td>
                                    <td class="member">
                                        <figure style={{ textAlign: 'left' }}><img alt="Student" src={studentImg} />  </figure>
                                        <div class="member-info" style={{ textAlign: 'left' }}>
                                            <p>{user.user_full_name}</p><p></p></div>  </td>
                                    <td><p>{userTypeMap[user.user_type]}</p></td>
                                    <td><UpdateUserTyp Id={user.id} fetchUser={fetchUser} /></td>
                                    <td>{user && <UserUpdateForm user={user} fetchUser={fetchUser} />}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {results.users.length > numDisplayed && (
                        <div class="FleX-container">
                            <div className='div-button'>
                                <button className='view_more' onClick={handleViewMore}>View More</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
