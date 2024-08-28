import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from '../../../config';
import AxiosInstance from '../AxiosInstance';
import '../styles.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      try {
        const res = await AxiosInstance.post(`${Config.baseURL}/Users/verify-email/`, { otp });
        const resp = res.data;
        if (res.status === 200) {
          navigate('/login');
          toast.success(resp.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message || 'Invalid OTP code');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    } else {
      setError('Please enter the OTP code.');
    }
  };

  return (
    <>
      <div className='main-wrapper'>
        <div className='Row1'>
          <div className="login-form">
            <h3 className="TitlE">Check your Gmail for Otp code</h3>
            <div>
              <form onSubmit={handleOtpSubmit}>
                <div className="single-form">
                  <input
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter your Otp code:"
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="single-form">
                  <button className="Btn Btn-primary" type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div><ToastContainer />
    </>
  );
};

export default VerifyEmail;
