 
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import AxiosInstance from '../AxiosInstance';
import '../styles.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const { uid, token } = useParams();
  const [newPasswords, setNewPasswords] = useState({
    password: "",
    confirm_password: "",
  });
  const { password, confirm_password } = newPasswords;

  const handleChange = (e) => {
    setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    
    const data = {
      password,
      confirm_password,
      uidb64: uid,
      token,
    };

    try {
      const res = await AxiosInstance.patch('/set-new-password/', data);
      if (res.status === 200) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resetting the password");
    }
  };

  return (
    <div className='main-wrapper'>
      <div className='Row1'>
        <div className="login-form">
          <h3 className="TitlE">Enter your New Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="single-form">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="New Password"
              />
            </div>
            <div className="single-form">
              <input
                type="password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
              />
            </div>
            <div className="single-form">
              <button className="Btn Btn-primary" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
