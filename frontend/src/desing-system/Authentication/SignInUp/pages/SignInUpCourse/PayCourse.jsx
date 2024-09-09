
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Config from '../../../../../config';
// import CheckoutCourse from '../../../../../pages/checkout/CheckoutCourse';
// import Loading from '../../../../components/Loading';
// import ErrorPage from '../../../../components/Loading/ErrorPage';
// import AxiosInstance from '../../../AxiosInstance';
// import '../../styles.css';
// import Head from './Head';
// import './PhoneNumberForm.css';

// export default function PayCourse() {
//     // Extract course UUID from URL parameters
//     const { course_uuid: courseId } = useParams();

//     const { userData } = useContext(UserContext); // Correctly use useContext to access userData



//     const navigate = useNavigate(); // Hook for navigation
//     const [courseDetail, setCourseDetail] = useState(null); // State to store course details
//     const [loading, setLoading] = useState(true); // State to manage loading state
//     const [error, setError] = useState(null); // State to handle errors
//     const [isEnrolled, setIsEnrolled] = useState(false); // State to track enrollment status


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Check local storage for refresh flag
//                 const hasRefreshed = localStorage.getItem('hasRefreshed');
//                 if (!hasRefreshed) {
//                     localStorage.setItem('hasRefreshed', 'true'); // Set the refresh flag
//                     window.location.reload(); // Refresh the page if userData is not available
//                     return;
//                 }
//                 // Clear the refresh flag if userData is available
//                 localStorage.removeItem('hasRefreshed');

//                 await checkAuthentication();
//                 await fetchCourseDetail();
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Error fetching data.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [courseId, navigate]); // Ensure dependencies are accurate










//     // Function to fetch course details from the server
//     const fetchCourseDetail = async () => {
//         try {
//             if (!courseId) return; // Exit if courseId is not available
//             const response = await AxiosInstance.get(`${Config.baseURL}/Courses/Course_pay/${courseId}/`);
//             setCourseDetail(response.data.course); // Set course details
//             setIsEnrolled(response.data.is_enrolled); // Set enrollment status
//         } catch (error) {
//             console.error('Error fetching course detail:', error);
//             setError('Error fetching course detail.'); // Set error message on failure
//         }
//     };

//     // Function to check if the user is authenticated
//     const checkAuthentication = async () => {
//         try {
//             await AxiosInstance.get(`${Config.baseURL}/payments/authenticated/`);
//         } catch (error) {
//             console.error('Error checking authentication:', error);
//             setError('User not authenticated.'); // Set error message if authentication fails
//         }
//     };

//     // useEffect hook to fetch data when component mounts or courseId changes
//     useEffect(() => {
//         const fetchData = async () => {
//             await checkAuthentication(); // Check if user is authenticated
//             await fetchCourseDetail(); // Fetch course details
//             setLoading(false); // Update loading state after data is fetched
//         };
//         fetchData();
//     }, [courseId]); // Dependencies array with courseId to refetch if it changes

//     // useEffect hook to navigate to "My Learning" page if the user is already enrolled
//     useEffect(() => {
//         if (isEnrolled) {
//             navigate('/MyLearning'); // Redirect to "My Learning" if user is enrolled
//         }
//     }, [isEnrolled, navigate]); // Dependencies array with isEnrolled and navigate

//     // Render loading state
//     if (loading) {
//         return <Loading />;
//     }

//     // Render error page if there is an error
//     if (error) {
//         return <ErrorPage head="Error Occurred" error={error} />;
//     }

//     // Render course details and checkout component
//     return (
//         <div className='Container'>
//             <div className='flex_Container'>
//                 <div className='flex_center'>
//                     {/* Render course header if courseDetail is available */}
//                     {courseDetail && <Head data={courseDetail} />}
//                     <div className='SigRow'>
//                         <div className='Cont_but'>
//                             <div className="card-body">
//                                 <div className='phone-div'>
//                                     {/* Render CheckoutCourse component if courseDetail is available */}
//                                     {courseDetail && (
//                                         <CheckoutCourse
//                                             Id={courseDetail.id}
//                                             name={courseDetail.title}
//                                             price={courseDetail.price}
//                                             Img={courseDetail.card_image}
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../../../../config'; // Import configuration file
import CheckoutCourse from '../../../../../pages/checkout/CheckoutCourse'; // Import CheckoutCourse component for payments
import Loading from '../../../../components/Loading'; // Component to display loading state
import ErrorPage from '../../../../components/Loading/ErrorPage'; // Component to display error page
import AxiosInstance from '../../../AxiosInstance'; // AxiosInstance for making HTTP requests
import '../../styles.css'; // Import styles for the component
import Head from './Head'; // Component to display course header
import './PhoneNumberForm.css'; // Import styles for PhoneNumberForm

export default function PayCourse() {
    // Extract course UUID from URL parameters
    const { course_uuid: courseId } = useParams();

    // Use context to access user data
    const navigate = useNavigate(); // Hook for navigation

    // State variables
    const [courseDetail, setCourseDetail] = useState(null); // To store course details
    const [loading, setLoading] = useState(true); // Manage loading state
    const [error, setError] = useState(null); // Handle errors
    const [isEnrolled, setIsEnrolled] = useState(false); // Track if the user is enrolled in the course

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check local storage for the refresh flag
                const hasRefreshed = localStorage.getItem('hasRefreshed');
                if (!hasRefreshed) {
                    localStorage.setItem('hasRefreshed', 'true'); // Set the refresh flag to avoid multiple reloads
                    window.location.reload(); // Reload the page if userData is not available
                    return;
                }
                // Clear the refresh flag if data is available
                localStorage.removeItem('hasRefreshed');

                // Check user authentication and fetch course details
                await checkAuthentication();
                await fetchCourseDetail();
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data.'); // Set error message in case of failure
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchData(); // Call fetchData function
    }, [courseId, navigate]); // Ensure useEffect runs when courseId or navigate changes

    // Function to fetch course details from the server
    const fetchCourseDetail = async () => {
        try {
            if (!courseId) return; // Exit if courseId is not available
            const response = await AxiosInstance.get(`${Config.baseURL}/Courses/Course_pay/${courseId}/`);
            setCourseDetail(response.data.course); // Set course details
            setIsEnrolled(response.data.is_enrolled); // Set enrollment status
        } catch (error) {
            console.error('Error fetching course detail:', error);
            setError('Error fetching course detail.'); // Set error message in case of failure
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

    // useEffect to redirect the user to "My Learning" if already enrolled
    useEffect(() => {
        if (isEnrolled) {
            navigate('/MyLearning'); // Redirect to "My Learning" page if user is enrolled
        }
    }, [isEnrolled, navigate]); // Runs when isEnrolled or navigate changes

    // Display loading state while fetching data
    if (loading) {
        return <Loading />;
    }

    // Display error page if an error occurs
    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    // Render course details and the checkout component
    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {/* Display course header if courseDetail is available */}
                    {courseDetail && <Head data={courseDetail} />}
                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div className="card-body">
                                <div className='phone-div'>
                                    {/* Display CheckoutCourse component if courseDetail is available */}
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