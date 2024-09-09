import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from '../AxiosInstance';
import '../styles.css';

const PasswordResetRequest = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const res = await AxiosInstance.post('/password-reset/', { 'email': email });
        if (res.status === 200) {
          toast.success('A link to reset your password has been sent to your email');
          setIsEmailSent(true);
        }
      } catch (error) {
        toast.error('Failed to send password reset email');
      }
      setEmail("");
    }
  }

  return (
    <div className='main-wrapper'>
      <div className='Row1'>
        <div className="login-form">

          {isEmailSent ? (
            <p>Please check your email for a link to reset your password.</p>
          ) : (<>
            <h3 className="TitlE">Enter your registered email</h3>
            <form onSubmit={handleSubmit}>

              <div className="single-form">
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address:"
                />
              </div>
              <div className="single-form">
                <button className="Btn Btn-primary" type="submit" value="Login">
                  Send
                </button>
              </div>
            </form></>
          )}
        </div>
      </div>        <ToastContainer />
    </div>

  );
}

export default PasswordResetRequest;
