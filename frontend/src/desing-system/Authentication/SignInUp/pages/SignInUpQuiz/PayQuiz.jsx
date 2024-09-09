

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../../../../config'; // Import configuration for API base URL
import CheckoutQuiz from '../../../../../pages/checkout/CheckoutQuiz'; // Component for handling quiz payment
import Loading from '../../../../components/Loading'; // Loading spinner component
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Error page component
import AxiosInstance from '../../../AxiosInstance'; // Axios instance for API requests
import '../../styles.css'; // Global styles for the component
import Head from './Head'; // Component to display exam header
import './PhoneNumberForm.css'; // Specific styles for the form

export default function PayQuiz() {
    // Extract the exam ID from the URL parameters
    const { id: examId } = useParams();
    const navigate = useNavigate(); // Hook for navigation

    // State to manage exam details, loading, error, and enrollment status
    const [examDetail, setExamDetail] = useState(null); // Store exam details
    const [loading, setLoading] = useState(true); // Manage loading state
    const [error, setError] = useState(null); // Handle errors
    const [isEnrolled, setIsEnrolled] = useState(false); // Track if the user is already enrolled

    // useEffect to handle component mount and fetch exam data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if the page has already been refreshed
                const hasRefreshed = localStorage.getItem('hasRefreshed');
                if (!hasRefreshed) {
                    // Set the refresh flag to avoid multiple reloads
                    localStorage.setItem('hasRefreshed', 'true');
                    window.location.reload(); // Reload the page if user data isn't available
                    return;
                }
                // Clear the refresh flag after successful data load
                localStorage.removeItem('hasRefreshed');

                // Check if the user is authenticated and fetch exam details
                await checkAuthentication();
                await fetchExamDetail();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data.'); // Set error message in case of failure
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchData(); // Call fetchData to initiate data fetching
    }, [examId, navigate]); // Rerun the effect if examId or navigate changes

    // Function to fetch exam details from the server
    const fetchExamDetail = async () => {
        try {
            if (!examId) return; // Exit if no examId is provided
            const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_pay/${examId}/`);
            setExamDetail(response.data.exam_data); // Set exam details in state
            setIsEnrolled(response.data.is_enrolled); // Update enrollment status
        } catch (error) {
            console.error('Error fetching exam detail:', error);
            setError('Error fetching exam detail.'); // Set error message in case of failure
        }
    };

    // Function to check if the user is authenticated
    const checkAuthentication = async () => {
        try {
            await AxiosInstance.get(`${Config.baseURL}/payments/authenticated/`);
        } catch (error) {
            console.error('Error checking authentication:', error);
            setError('User not authenticated.'); // Set error message if authentication fails
        }
    };

    // useEffect to navigate to "My Learning" if the user is already enrolled
    useEffect(() => {
        if (isEnrolled) {
            navigate('/MyLearning'); // Redirect to "My Learning" page if user is enrolled
        }
    }, [isEnrolled, navigate]); // Re-run effect if enrollment status changes

    // Render the loading state while data is being fetched
    if (loading) {
        return <Loading />;
    }

    // Render the error page if an error occurs
    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    // Render the exam details and payment component
    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {/* Render the exam header if examDetail is available */}
                    {examDetail && <Head data={examDetail} />}

                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div className="card-body">
                                <div className='phone-div'>
                                    {/* Render the CheckoutQuiz component if examDetail is available */}
                                    {examDetail && (
                                        <CheckoutQuiz
                                            Id={examDetail.id}
                                            name={examDetail.title}
                                            price={examDetail.price}
                                            Img={examDetail.card_image}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}