
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../../../../config';
import Loading from '../../../../components/Loading';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import AxiosInstance from '../../../AxiosInstance';
import '../../styles.css';
import Head from './Head';
import PhoneNumberForm from './PhoneNumberForm/PhoneNumberForm';

export default function PayLiveCourse() {
    const { id: courseId } = useParams();
    const navigate = useNavigate();

    const [courseDetail, setCourseDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check local storage for refresh flag
                const hasRefreshed = localStorage.getItem('hasRefreshed');
                if (!hasRefreshed) {
                    localStorage.setItem('hasRefreshed', 'true'); // Set the refresh flag
                    window.location.reload(); // Refresh the page if userData is not available
                    return;
                }
                // Clear the refresh flag if userData is available
                localStorage.removeItem('hasRefreshed');

                await checkAuthentication();
                await fetchCourseDetail();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, navigate]); // Ensure dependencies are accurate

    const fetchCourseDetail = async () => {
        try {
            if (!courseId) return;
            const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/LiveCourse_pay/${courseId}`);
            setCourseDetail(response.data.course);
            setIsEnrolled(response.data.is_enrolled);
        } catch (error) {
            console.error('Error fetching course detail:', error);
            setError('Error fetching course detail.');
        }
    };

    const checkAuthentication = async () => {
        try {
            await AxiosInstance.get(`${Config.baseURL}/payments/authenticated/`);
        } catch (error) {
            console.error('Error checking authentication:', error);
            setError('User not authenticated.');
            navigate('/login'); // Redirect to login page if not authenticated
        }
    };

    useEffect(() => {
        if (isEnrolled) {
            navigate('/MyLearning');
        }
    }, [isEnrolled, navigate]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {courseDetail ? <Head data={courseDetail} /> : <div>Loading course details...</div>}
                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div className="card-body">
                                {courseDetail && <PhoneNumberForm data={courseDetail} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}