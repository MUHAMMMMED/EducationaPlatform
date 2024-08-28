
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
 
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Footer from '../../desing-system/components/Footer/Footer';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import Question from '../../desing-system/components/Question/Question';
import Slider from '../../desing-system/components/Slider/Slider';
import CountdownTimer from './components/Countdown/CountdownTimer';
import Definition from './components/Definition/Definition';
import DownTimer from './components/DownTimer/DownTimer';
import Feedback from './components/Feedback/Feedback';
import Head from './components/Head';
import JoinButtons from './components/JoinButtons/JoinButtons';
import LearningPath from './components/LearningPath/LearningPath';
import Speaker from './components/Speaker/Speaker';
import { LiveContainer, LiveContainerRow } from './styles';
import './styles.css';

export default function LiveCourses() {
  const { id: courseId } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    try {
      if (!courseId) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/LiveCourses/${courseId}`);
      setCourseData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "The Course is not available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);


  // Google Tag Manager 
  useEffect(() => {
    if (courseData?.Base?.pixel_id) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){
          w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${courseData?.Base?.pixel_id}');
      `;
      document.head.appendChild(script);
    }
  }, [courseData?.Base?.pixel_id]);
  // End Google Tag Manager

 
 if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }
 
 
  return (<>
 
<LiveContainer>
<LiveContainerRow  style={{backgroundColor:'#fff'}}>
<Head data={courseData}/> 
{courseData && courseData.waitingDate  && courseData.time  && (<DownTimer data={courseData} /> )} 
{courseData && courseData.Base   && (<JoinButtons data={courseData} /> )} 
</LiveContainerRow>

{courseData && courseData.Base.definition  && (
<LiveContainerRow  style={{backgroundColor:'#000'  }}>
<Definition data={courseData} /></LiveContainerRow> )} 

<LiveContainerRow  style={{backgroundColor:'#fff' }} >
<Speaker  data={courseData} />  </LiveContainerRow>  

 <LiveContainerRow  style={{backgroundColor:'#548f8f', paddingTop: '-5px'}}>
<LearningPath data={courseData} /> </LiveContainerRow>  

{courseData && courseData.rates  && (
<LiveContainerRow  style={{backgroundColor:'#fff' ,borderRadius:'0px'   }}> 
<Feedback data={courseData.rates} /></LiveContainerRow>  )} 

{courseData && courseData.waitingDate  && courseData.time  &&  (
<LiveContainerRow  style={{backgroundColor:'rgb(210 223 208)',   }}>
<CountdownTimer data={courseData} /></LiveContainerRow>)} 

{courseData && courseData.review_images  && (
<LiveContainerRow  style={{backgroundColor:'#FFF' , paddingTop: '40px' }}>
<Slider review_images={courseData.review_images} /></LiveContainerRow>)} 

{courseData && courseData.questions  && (
<LiveContainerRow  style={{backgroundColor:'#5c898d'  }}> <br/>
<Question questions={courseData.questions}  /> </LiveContainerRow>  )}    

 {courseData && courseData.waitingDate  && courseData.time  &&  (
 <LiveContainerRow  style={{backgroundColor:'rgb(210 223 208)',borderRadius:'0px'  }}>  
 <CountdownTimer data={courseData} />  </LiveContainerRow>)}
 <Footer/>
        
 </LiveContainer>  
 
 
{/* <!-- Google Tag Manager (noscript) --> */}
<noscript>
  <iframe src={`https://www.googletagmanager.com/ns.html?id=${courseData?.Base?.pixel_id}`}
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
{/* <!-- End Google Tag Manager (noscript) --> */}

    </>
  )
}
