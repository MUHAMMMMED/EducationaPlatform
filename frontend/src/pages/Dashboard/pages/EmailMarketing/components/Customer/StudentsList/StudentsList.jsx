
import React, { useEffect, useState } from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import Config from '../../../../../../../config';
import AxiosInstance from '../../../../../../../desing-system/Authentication/AxiosInstance';
import studentImg from './Student.png';
import './styles.css';

export default function StudentsList() {
    const [results, setResults] = useState({ data: { users: [], user_count: 0 }, message: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numDisplayed, setNumDisplayed] = useState(5);
    const [data, setData] = useState([]);
    const [campaign, setCampaign] = useState('');
    const [save, setSave] = useState('waiting');

    const fetchUser = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/EmailMarketing/student_Filter/`, {
                params: { query: searchTerm, start_date: startDate, end_date: endDate, email: email, campaign_id: campaign, save: save }
            });
            if (response.status === 200) {
                setResults({ data: response.data.data, message: response.data.message });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [searchTerm, startDate, endDate, email, campaign, save]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosInstance.get(`${Config.baseURL}/EmailMarketing/campaign_data/`);
                if (response.status !== 200) {
                    throw new Error('Error fetching data');
                }
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='section_StudentsList'>
            <div className="Course_card_content">
                <form className="form">
                    <div className="Course_card_content" style={{ padding: '0px 10px 10px 20px ' }}>
                        <div className="Course_card_info">
                            <select className="Action-Box" style={{ marginLeft: '0px' }} onChange={(e) => setCampaign(e.target.value)} value={campaign}>
                                <option value=''>Select Campaign</option>
                                {data && data.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="Course_card_info">
                            <button type="button" onClick={() => setSave('save')} className="Run_button">Save</button>
                        </div>

                        {results.message && <div className="Course_card_info"> <GrCompliance /> {results.message} </div>}

                    </div>
                </form>

            </div>

            <div className="projects">
                <div className="projects-inner">
                    <header className="Projects-header">
                        <div className="Projects-header-Title">
                            <FaUserGraduate /> {results.data.user_count} Students
                        </div>
                        <div className="FleX-container">
                            <div className="div_input">
                                <input type="text" className='Search' style={{ marginLeft: '5px' }} onChange={handleSearch} placeholder="Search.." />
                                <input type="text" className='Search' style={{ marginLeft: '5px' }} onChange={handleEmail} placeholder="Email.." />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleStartDate} />
                                <input type="date" className='Search' style={{ marginLeft: '5px' }} onChange={handleEndDate} />
                            </div>
                        </div>
                    </header>
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Email</th>
                                <th>Student</th>
                                <th>User Type</th>

                            </tr>
                        </thead>
                        <tbody>
                            {results.data.users && results.data.users.slice(0, numDisplayed).map(user => (
                                <tr key={user.id} style={{ color: '#000' }}>
                                    <td><p>{new Date(user.date_joined).toLocaleDateString()}</p><p></p></td>
                                    <td><p>{user.email}</p><p></p></td>
                                    <td class="member">
                                        <figure style={{ textAlign: 'left' }}><img alt="Student" src={studentImg} /></figure>
                                        <div class="member-info" style={{ textAlign: 'left' }}>
                                            <p>{user.user_full_name}</p><p></p>
                                        </div>
                                    </td>
                                    <td><p>{userTypeMap[user.user_type]}</p></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {results.data.users && results.data.users.length > numDisplayed && (
                        <div className="FleX-container">
                            <div className="div-button">
                                <button className="view_more" onClick={handleViewMore}>View More</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
