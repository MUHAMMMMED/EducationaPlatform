// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Config from '../../../../../config';
// import CheckoutCourse from '../../../../../pages/checkout/CheckoutCourse';
// import Loading from '../../../../components/Loading';
// import ErrorPage from '../../../../components/Loading/ErrorPage';
// import AxiosInstance from '../../../AxiosInstance';
// import '../../styles.css';
// import Head from './Head';
// import './PhoneNumberForm.css';

// export default function PayCourse() {
  
//     const { course_uuid: courseId } = useParams();
//     const [courseDetail, setCourseDetail] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isEnrolled, setIsEnrolled] = useState(false);  // State for enrollment status

//     const fetchCourseDetail = async () => {
//         try {
//             if (!courseId) return;
//             const response = await AxiosInstance.get(`${Config.baseURL}/Courses/Course_pay/${courseId}/`);
//             setCourseDetail(response.data.course);
//             setIsEnrolled(response.data.is_enrolled);  
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


//     useEffect(() => {
//         if (isEnrolled) {
//             navigate('/MyLearning');  // Navigate to "My Learning" page if user is already enrolled in the course
//         }
//     }, [isEnrolled, navigate]);




//     if (loading) {
//         return <Loading />;
//     }

//     if (error) {
//         return <ErrorPage head="Error Occurred" error={error} />;
//     }

 
//     return (
//         <div className='Container'>
//         <div className='flex_Container'>
//          <div className='flex_center'>
//          {courseDetail&&  <Head  data={courseDetail}  />}
//          <div className='SigRow'>
//          <div className='Cont_but'>
//          <div className="card-body">
//          <div className='phone-div'>
//          {courseDetail && (
//     <CheckoutCourse 
//         Id={courseDetail.id} 
//         name={courseDetail.title} 
//         price={courseDetail.price} 
//         Img={courseDetail.card_image} 
//     />  )} </div>
//          </div> </div></div>
//           </div></div></div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../../../../config';
import CheckoutCourse from '../../../../../pages/checkout/CheckoutCourse';
import Loading from '../../../../components/Loading';
import ErrorPage from '../../../../components/Loading/ErrorPage';
import AxiosInstance from '../../../AxiosInstance';
import '../../styles.css';
import Head from './Head';
import './PhoneNumberForm.css';

export default function PayCourse() {
    // Extract course UUID from URL parameters
    const { course_uuid: courseId } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [courseDetail, setCourseDetail] = useState(null); // State to store course details
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment status

    // Function to fetch course details from the server
    const fetchCourseDetail = async () => {
        try {
            if (!courseId) return; // Exit if courseId is not available
            const response = await AxiosInstance.get(`${Config.baseURL}/Courses/Course_pay/${courseId}/`);
            setCourseDetail(response.data.course); // Set course details
            setIsEnrolled(response.data.is_enrolled); // Set enrollment status
        } catch (error) {
            console.error('Error fetching course detail:', error);
            setError('Error fetching course detail.'); // Set error message on failure
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

    // useEffect hook to fetch data when component mounts or courseId changes
    useEffect(() => {
        const fetchData = async () => {
            await checkAuthentication(); // Check if user is authenticated
            await fetchCourseDetail(); // Fetch course details
            setLoading(false); // Update loading state after data is fetched
        };
        fetchData();
    }, [courseId]); // Dependencies array with courseId to refetch if it changes

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

    // Render course details and checkout component
    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {/* Render course header if courseDetail is available */}
                    {courseDetail && <Head data={courseDetail} />}
                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div className="card-body">
                                <div className='phone-div'>
                                    {/* Render CheckoutCourse component if courseDetail is available */}
                                    {courseDetail && (
                                        <CheckoutCourse 
                                            Id={courseDetail.id} 
                                            name={courseDetail.title} 
                                            price={courseDetail.price} 
                                            Img={courseDetail.card_image} 
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
