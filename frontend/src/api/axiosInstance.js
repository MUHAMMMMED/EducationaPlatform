 

import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;




















// export default axiosInstance;
// import React, { useState, useEffect } from 'react';
// import axiosInstance from './path-to-your-custom-axios-instance';

// const ExamList = () => {
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axiosInstance.get('http://127.0.0.1:8000/Quiz/available_exams/');
//         setExams(response.data);
//       } catch (error) {
//         console.error(error);
//         // Handle error, maybe display a message to the user
//       }
//     };

//     fetchExams();
//   }, []);

//   return (
//     <div>
//       <h1>Available Exams</h1>
//       <ul>
//         {exams.map((exam) => (
//           <li key={exam.id}>
//             <a href={`/Quiz/exam_detail/${exam.id}/`}>{exam.title}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExamList;
