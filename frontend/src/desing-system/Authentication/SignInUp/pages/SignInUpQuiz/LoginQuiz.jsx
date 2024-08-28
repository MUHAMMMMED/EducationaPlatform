import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
 
import { useParams } from 'react-router-dom';
import Config from '../../../../../config';
import Loading from '../../../../components/Loading';
import AxiosInstance from '../../../AxiosInstance';
import '../../../styles.css';
import '../../styles.css';
import Head from './Head';
export default function LoginQuiz() {
  const { id:examId } = useParams();
 
    const navigate = useNavigate();
    const [user ] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
      if (user) {
        navigate('/dashboard');
      }
    }, [user, navigate]);
   
    const [logindata, setLogindata] = useState({
      email: "",
      password: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); 
  
    const handleOnChange = (e) => {
      setLogindata({ ...logindata, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await AxiosInstance.post('/login/', logindata);
        const response = res.data;
        const user = {
          'full_name': response.full_name,
          'email': response.email
        };
        if (res.status === 200) {
          localStorage.setItem('token', JSON.stringify(response.access_token));
          localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token));
          localStorage.setItem('user', JSON.stringify(user));
         
          await  navigate(`/Pay_Quiz/${examId}/`);
          toast.success('Login successful');
  
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Invalid email or password. Please try again.");
        } else {
          console.error('Error during login:', error);
          toast.error('An unexpected error occurred. Please try again later.');
        }
      }
    };
 
    const [examDetail, setExamDetail] = useState(null);
    const fetchExamDetail = async () => {
      try {
          if (!examId) return;
          const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_pay/${examId}/`);
          setExamDetail(response.data.exam_data  ); // assuming your response structure has a 'exam' key
      } catch (error) {
          console.error('Error fetching exam detail:', error);
      }
  };
        useEffect(() => {
          fetchExamDetail();
        }, [examId]);
    
 
        if (!examDetail) {
          return <Loading />;
      }
 
return (
 <div className='Container'> 
<div className='flex_Container'> 
 <div className='flex_center'> 
 {examDetail&&  <Head  data={examDetail}  />}
 <div className='SigRow1'>
 
      <div className='Row1'>
        <div className="login-form">
          <h4 className="TitlE">Login  Now </h4>
          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="single-form">
                <input type="email" name="email" value={logindata.email} onChange={handleOnChange} placeholder="Email" />
              </div>
              <div className="single-form">
                <input type="password" value={logindata.password} name="password" onChange={handleOnChange} placeholder="Password" />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="single-form">
                <button className="Btn Btn-primary" type="submit" value="Login">Login</button>
                <Link to={`/Signup_Quiz/${examId}/`} className="Btn Btn-secondary">Create an account now</Link>
              </div>
              <p className='forgot-password-link'>
                <Link to={'/forget-password'} className='link'>
                  Forgot password
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
 
 
 </div> </div> </div></div>

  )
}






 

 