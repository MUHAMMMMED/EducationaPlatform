import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaDownload, FaUserGraduate } from "react-icons/fa";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import UpdateStatus from '../UpdateStatus/UpdateStatus';
import studentImg from './Student.png';
import './styles.css';

export default function StudentsList({Id}) {

    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numDisplayed, setNumDisplayed] = useState(5); // Track number of items displayed
  
        const fetchUser = async () => {
            try {
				if (!Id) return;
                const response = await axios.get(`${Config.baseURL}/Courses/user_Filter/${Id}`, {
                    params: {
                        query: searchTerm,
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
    }, [searchTerm,   startDate, endDate, status]);

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
 
 
  // Function to download data
  const downloadData = async () => {
	try {
		if (!Id) return
		const response = await AxiosInstance.get(`${Config.baseURL}/Courses/download_users_data/${Id}`, {
			responseType: 'blob' // Set response type to blob
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'Course_enrolled_students.csv');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	} catch (error) {
	 
	}
};
 const handleViewMore = () => {
        setNumDisplayed(prevNumDisplayed => prevNumDisplayed + 10); // Increment by 10 when "View More" button is clicked
    };

    return (
        <div className='section_StudentsList'>
            <div class="projects">
                <div class="projects-inner">
                    <header class="Projects-header">
                     <div class="Projects-header-Title"><FaUserGraduate /> {results && results.user_count} Enrolled Students</div>
                     <div class="FleX-container">
                     <div class="div_input">
                     <input type="text" className='Search' style={{marginLeft:'5px'}}onChange={handleSearch} placeholder="Search.." />

                     <input type="date" className='Search'style={{marginLeft:'5px'}} onChange={handleStartDate} />
                     <input type="date" className='Search'style={{marginLeft:'5px'}} onChange={handleEndDate} />
                     <select class="ActionBox" onChange={handleStatus} style={{marginLeft:'5px'}}>
                     <option value='' >Select Status</option>
                     <option value="E">Enrolled</option>
                    <option value="O">Out</option>
                     </select>
                     <div  onClick={downloadData} class="FaDow" style={{marginLeft:'5px'}}><FaDownload /> </div> 
					 </div>
                     </div> </header>
                     <table class="projects-table">
                     <thead><tr>
                     <th>Date</th><th>Email</th><th>Student</th><th>Paid</th><th>Status</th><th class="text-right">Actions</th>
                     </tr> </thead>
                     <tbody>
                     {results.users && results.users.slice(0, numDisplayed).map(item => (
                     <tr key={item.id}>
                    <td><p>{item.date}</p><p></p></td>
                    <td><p>{ item.student.email}</p><p></p></td>
                    <td class="member"> <figure style={{ textAlign: 'left' }}><img alt="Student" src={studentImg} /></figure>
                    <div class="member-info" style={{ textAlign: 'left' }}> <p>{item.student.user_full_name}</p><p></p> </div>  </td>
                   <td><p></p><p>${item.Paid}</p></td>
                   <td className="status" style={{ textAlign: 'left' }}>         
                   <span className={`status-text ${item.status === 'E' ? 'status-green' : item.status === 'O' ? 'status-red' : ''}`}>
                   {item.status === 'E' ? 'Enrolled' : item.status === 'O' ? 'Out' : ''}
                 </span></td>


                <UpdateStatus Id={item.id} fetchUser={fetchUser} />
                </tr>  ))}
                </tbody>
                </table>
                 {results.users && results.users.length > numDisplayed && (
                <div class="FleX-container"><div className='div-button'><button className='view_more' onClick={handleViewMore}>View More</button></div>
                </div> )}
                 </div></div></div>
    )
}
