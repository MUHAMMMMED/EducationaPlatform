import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from '../AxiosInstance';

const Signup = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        if (user) {
            navigate('/Redirection');
        }
    }, [user, navigate]);

    const [formdata, setFormdata] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const errors = {};
        if (!formdata.email.trim()) {
            errors.email = "Email is required";
        }
        if (!formdata.first_name.trim()) {
            errors.first_name = "First Name is required";
        }
        if (!formdata.last_name.trim()) {
            errors.last_name = "Last Name is required";
        }
        if (!formdata.password.trim()) {
            errors.password = "Password is required";
        }
        if (!formdata.password2.trim()) {
            errors.password2 = "Confirm Password is required";
        } else if (formdata.password !== formdata.password2) {
            errors.password2 = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Show the loading toast
        const loadingToastId = toast.loading("Loading...");

        try {
            const response = await AxiosInstance.post('/register/', formdata);
            const result = response.data;
            if (response.status === 201) {
                // Update the toast to success
                toast.update(loadingToastId, {
                    render: result.message,
                    type: "success",
                    isLoading: false,
                    autoClose: 5000,
                });
                const loginResponse = await AxiosInstance.post('/login/', {
                    email: formdata.email,
                    password: formdata.password
                });
                const loginResult = loginResponse.data;
                if (loginResponse.status === 200) {
                    const user = {
                        'full_name': loginResult.full_name,
                        'email': loginResult.email
                    };
                    localStorage.setItem('token', JSON.stringify(loginResult.access_token));
                    localStorage.setItem('refresh_token', JSON.stringify(loginResult.refresh_token));
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success('Registration and login successful');
                    navigate('/Redirection');
                }
            }

        } catch (error) {
            console.error('Error during signup:', error);
            // Update the toast to error
            toast.update(loadingToastId, {
                render: error.response?.data?.message || 'An unexpected error occurred. Please try again later.',
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
        }
    };

    return (
        <>
            <div className='main-wrapper'>
                <div className='Row1'>
                    <div className="login-form">
                        <h3 className="TitlE">Register Now</h3>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="single-form">
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formdata.first_name}
                                        onChange={handleOnChange}
                                        placeholder="First Name"
                                    />
                                    {errors.first_name && <p className="error-message">{errors.first_name}</p>}
                                </div>
                                <div className="single-form">
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formdata.last_name}
                                        onChange={handleOnChange}
                                        placeholder="Last Name"
                                    />
                                    {errors.last_name && <p className="error-message">{errors.last_name}</p>}
                                </div>
                                <div className="single-form">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formdata.email}
                                        onChange={handleOnChange}
                                        placeholder="Email"
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </div>
                                <div className="single-form">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formdata.password}
                                        onChange={handleOnChange}
                                        placeholder="Password"
                                    />
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                </div>
                                <div className="single-form">
                                    <input
                                        type="password"
                                        name="password2"
                                        value={formdata.password2}
                                        onChange={handleOnChange}
                                        placeholder="Confirm Password"
                                    />
                                    {errors.password2 && <p className="error-message">{errors.password2}</p>}
                                </div>
                                <div className="single-form">
                                    <button className="Btn Btn-primary" type="submit">
                                        Create an account
                                    </button>
                                    <a className="Btn Btn-secondary" href="/login">Login</a>
                                    <br />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Signup;
