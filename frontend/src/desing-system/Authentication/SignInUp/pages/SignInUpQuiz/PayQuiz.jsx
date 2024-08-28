 
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../../../../config';
import CheckoutQuiz from '../../../../../pages/checkout/CheckoutQuiz';
import Loading from '../../../../components/Loading';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import AxiosInstance from '../../../AxiosInstance';
import '../../styles.css';
import Head from './Head';
import './PhoneNumberForm.css';

export default function PayQuiz() {
    // Extract exam ID from URL parameters
    const { id: examId } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [examDetail, setExamDetail] = useState(null); // State to store exam details
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment status

    // Function to fetch exam details from the server
    const fetchExamDetail = async () => {
        try {
            if (!examId) return; // Exit if examId is not available
            const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_pay/${examId}/`);
            setExamDetail(response.data.exam_data); // Set exam details
            setIsEnrolled(response.data.is_enrolled); // Set enrollment status
        } catch (error) {
            console.error('Error fetching exam detail:', error);
            setError('Error fetching exam detail.'); // Set error message on failure
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
    // useEffect hook to fetch data when component mounts or examId changes
    useEffect(() => {
        const fetchData = async () => {
            await checkAuthentication(); // Check if user is authenticated
            await fetchExamDetail(); // Fetch exam details
            setLoading(false); // Update loading state after data is fetched
        };
        fetchData();
    }, [examId]); // Dependencies array with examId to refetch if it changes

    // useEffect hook to navigate to "My Learning" page if the user is already enrolled
    useEffect(() => {
        if (isEnrolled) {
            navigate('/MyLearning'); // Redirect to "My Learning" if user is enrolled
        }
    }, [isEnrolled, navigate]); // Dependencies array with isEnrolled and navigate

    // Render loading state
    if (loading) {
        return <Loading />;
    }

    // Render error page if there is an error
    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    // Render exam details and checkout component
    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {/* Render exam header if examDetail is available */}
                    {examDetail && <Head data={examDetail} />}
                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div className="card-body">
                                <div className='phone-div'>
                                    {/* Render CheckoutQuiz component if examDetail is available */}
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

