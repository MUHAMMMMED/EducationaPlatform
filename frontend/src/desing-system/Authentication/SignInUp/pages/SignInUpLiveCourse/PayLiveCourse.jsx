// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Config from '../../../../../config';
// import Loading from '../../../../components/Loading';
// import ErrorPage from '../../../../components/Loading/ErrorPage';
// import AxiosInstance from '../../../AxiosInstance';
// import '../../styles.css';
// import Head from './Head';
// import PhoneNumberForm from './PhoneNumberForm/PhoneNumberForm';

// export default function PayLiveCourse() {
//     const { id: courseId } = useParams();
//     const [courseDetail, setCourseDetail] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);



//     if (is_enrolled=false) {
//         navigate('/MyLearning');
//       return;
//     }

  


//     const fetchCourseDetail = async () => {
//         try {
//             if (!courseId) return;
//             const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/LiveCourse_pay/${courseId}`);
//             setCourseDetail(response.data.course);
//         } catch (error) {
//             console.error('Error fetching course detail:', error);
//             setError('Error fetching course detail.');
//         }
//     };

//     const checkAuthentication = async () => {
//         try {
//             await AxiosInstance.get(`${Config.baseURL}/payments/authenticated/`);
//         } catch (error) {
//             console.error('Error checking authentication:', error);
//             setError('User not authenticated.');
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             await checkAuthentication();
//             await fetchCourseDetail();
//             setLoading(false);
//         };
//         fetchData();
//     }, [courseId]);

//     if (loading) {
//         return <Loading />;
//     }

//     if (error) {
//         return <ErrorPage head="Error Occurred" error={error} />;
//     }

//     return (
//         <div className='Container'>
//             <div className='flex_Container'>
//                 <div className='flex_center'>
//                     {courseDetail && <Head data={courseDetail} />}
//                     <div className='SigRow'>
//                         <div className='Cont_but'>
//                             <div className="card-body">
//                                 <PhoneNumberForm data={courseDetail} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Added useNavigate
import Config from '../../../../../config';
import Loading from '../../../../components/Loading';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import AxiosInstance from '../../../AxiosInstance';
import '../../styles.css';
import Head from './Head';
import PhoneNumberForm from './PhoneNumberForm/PhoneNumberForm';

export default function PayLiveCourse() {
    const { id: courseId } = useParams();
    const navigate = useNavigate();  // Using useNavigate for navigation
    const [courseDetail, setCourseDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);  // State for enrollment status

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check for authentication
                await checkAuthentication();

                // Fetch course details
                await fetchCourseDetail();
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [courseId]);

    const fetchCourseDetail = async () => {
        try {
            if (!courseId) return;
            const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/LiveCourse_pay/${courseId}`);
            setCourseDetail(response.data.course);
            setIsEnrolled(response.data.is_enrolled);  // Update enrollment status based on fetched data
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
        }
    };

    useEffect(() => {
        if (isEnrolled) {
            navigate('/MyLearning');  // Navigate to "My Learning" page if user is already enrolled in the course
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
                    {courseDetail && <Head data={courseDetail} />}
                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div className="card-body">
                                <PhoneNumberForm data={courseDetail} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
