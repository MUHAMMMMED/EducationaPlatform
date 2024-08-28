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
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numDisplayed, setNumDisplayed] = useState(5); // Track number of items displayed
  
        const fetchUser = async () => {
            try {
				if (!Id) return;
                const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/user_Filter/${Id}`, {
                    params: {
                        query: searchTerm,
                        phone: phone,
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
    }, [searchTerm, phone, startDate, endDate, status]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
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
		const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/download_users_data/${Id}`, {
			responseType: 'blob' // Set response type to blob
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'enrolled_students.csv');
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
                     <input type="text" className='Search'style={{marginLeft:'5px'}} onChange={handlePhone} placeholder="Phone Number.." />
                     <input type="date" className='Search'style={{marginLeft:'5px'}} onChange={handleStartDate} />
                     <input type="date" className='Search'style={{marginLeft:'5px'}} onChange={handleEndDate} />
                     <select class="ActionBox" onChange={handleStatus} style={{marginLeft:'5px'}}>
                     <option value='' >Select Status</option>
                     <option value='W'>waiting</option>
                     <option value='L'>live</option>
                     <option value='F'>finished</option>
                     <option value='O'>out</option>
                     </select>
                     <div  onClick={downloadData} class="FaDow" style={{marginLeft:'5px'}}><FaDownload /> </div> 
					 </div>
                     </div> </header>
                     <table class="projects-table">
                     <thead><tr>
                     <th>Date</th><th>Phone Number</th><th>Student</th><th>Paid</th><th>Status</th><th class="text-right">Actions</th>
                     </tr> </thead>
                     <tbody>
                     {results.users && results.users.slice(0, numDisplayed).map(item => (
                     <tr key={item.id}>
                 <td><p>{item.date}</p><p></p></td>
                 <td><p>{item.student.phone}</p><p></p></td>
                 <td class="member"> <figure style={{ textAlign: 'left' }}><img alt="Student" src={studentImg} /></figure>
                 <div class="member-info" style={{ textAlign: 'left' }}> <p>{item.student.user_full_name}</p><p></p> </div>  </td>
                 <td><p></p><p>${item.Paid}</p></td>
                 <td class="status" style={{ textAlign: 'left' }}>         
                 <span class={`status-text ${item.status === 'W' ? 'status-orange' : item.status === 'L' ? 'status-green' : item.status === 'F' ? 'status-blue' : item.status === 'O' ? 'status-red' : ''}`}>
                {item.status === 'W' ? 'waiting' : item.status === 'L' ? 'live' : item.status === 'F' ? 'finished' : item.status === 'O' ? 'out' : ''}
                 </span> </td>
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
