
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Config from '../../../../../config';
import Loading from '../../../../components/Loading';
import AxiosInstance from '../../../AxiosInstance';
import '../../styles.css';
import Head from './Head';


export default function SignInUpCourse() {
    const { course_uuid: courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);

    const fetchCourseDetail = async () => {
        try {
            if (!courseId) return;
            const response = await AxiosInstance.get(`${Config.baseURL}/Courses/Course_pay/${courseId}/`);
            setCourseDetail(response.data.course); // assuming your response structure has a 'course' key
        } catch (error) {
            console.error('Error fetching course detail:', error);
        }
    };

    useEffect(() => {
        fetchCourseDetail();
    }, [courseId]);

    if (!courseDetail) {
        return <Loading />;
    }


    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {courseDetail && <Head data={courseDetail} />}

                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div class="card-body">
                                <h2 class="card_welcome ">You need to log in first to register for the course.</h2>
                                <div class="btn-wrap">
                                    <p className='card-body_text'>Create a new account. </p>
                                    <Link to={`/Signup_Course/${courseId}/`}>
                                        <div class="WRAP"><a class="BTN btn-login" > Create Account </a> </div></Link>
                                    <p className='card-body_text'>Already have an account? </p>
                                    <Link to={`/Login_Course/${courseId}/`}>
                                        <div class="WRAP"> <a class="BTN btn-register" >Log in Now</a> </div></Link>
                                </div> </div></div></div> </div> </div></div>

    )
}
