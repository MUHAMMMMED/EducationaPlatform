
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "../AxiosInstance";
import '../styles.css';

const Login = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    if (user) {
      navigate('/Redirection');
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
        toast.success('Login successful');
        await navigate('/Redirection');

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

  return (
    <div className='main-wrapper' >
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
                <Link to="/Signup" className="Btn Btn-secondary">Create an account now</Link>
              </div>
              <p className='forgot-password-link'>
                <Link to={'/forget-password'} className='link'>
                  Forgot password
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>   <ToastContainer />
    </div>
  );
}

export default Login;
