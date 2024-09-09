
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Config from '../../../../../config';
import Loading from '../../../../components/Loading';
import AxiosInstance from '../../../AxiosInstance';
import '../../styles.css';
import Head from './Head';


export default function SignInUpQuiz() {
    const { id: examId } = useParams();
    const [examDetail, setExamDetail] = useState(null);

    const fetchExamDetail = async () => {
        try {
            if (!examId) return;
            const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_pay/${examId}/`);
            setExamDetail(response.data.exam_data); // assuming your response structure has a 'exam' key
        } catch (error) {
            console.error('Error fetching exam detail:', error);
        }
    };

    useEffect(() => {
        fetchExamDetail();
    }, [examId]);

    if (!examDetail) {
        return <Loading />;
    }

    return (
        <div className='Container'>
            <div className='flex_Container'>
                <div className='flex_center'>
                    {examDetail && <Head data={examDetail} />}

                    <div className='SigRow'>
                        <div className='Cont_but'>
                            <div class="card-body">
                                <h2 class="card_welcome ">You need to log in first to register for the Quiz.</h2>
                                <div class="btn-wrap">
                                    <p className='card-body_text'>Create a new account. </p>
                                    <Link to={`/Signup_Quiz/${examId}/`}>
                                        <div class="WRAP"><a class="BTN btn-login" > Create Account </a> </div></Link>
                                    <p className='card-body_text'>Already have an account? </p>
                                    <Link to={`/Login_Quiz/${examId}/`}>
                                        <div class="WRAP"> <a class="BTN btn-register" >Log in Now</a> </div></Link>
                                </div> </div></div></div> </div> </div></div>

    )
}
