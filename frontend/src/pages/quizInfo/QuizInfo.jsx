
import React, { useEffect, useState } from 'react';
import { BiListOl } from "react-icons/bi";
import { CgTime } from "react-icons/cg";
import { FaUserGraduate } from "react-icons/fa";
import { IoIosSync } from 'react-icons/io';
import { PiTimer } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Author from '../../desing-system/components/CoursesCard/Author';
import Footer from '../../desing-system/components/Footer/Footer';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import Question from '../../desing-system/components/Question/Question';
import Slider from '../../desing-system/components/Slider/Slider';
import StudentRank from '../../desing-system/components/StudentRank';
import CheckoutQuiz from '../checkout/CheckoutQuiz';
import { AuthorItem, Banner, Button, CardWrapper, Content, DescriptionWrapper, Enroll, H4, InfoAuthor, InfoPrice, LI, P, Price, ReviewsSection, RowInfo, Section, Sidebar, SidebarWidget, Span, Strong, TabDescription, Title, UL } from './styles';
export default function QuizInfo() {

  const { id: examId } = useParams();
  const [examDetails, setExamDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExamDetail = async () => {
    try {
      if (!examId) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam/${examId}/`);


      setExamDetails(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "The Quiz is not available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamDetail();
  }, [examId]);



  // Google Tag Manager 
  useEffect(() => {
    if (examDetails.pixel_id) {
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
        })(window,document,'script','dataLayer', '${examDetails.pixel_id}');
      `;
      document.head.appendChild(script);
    }
  }, [examDetails.pixel_id]);
  // End Google Tag Manager


  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }




  return (
    <div className='Container'>
      <div className='container'>
        <CardWrapper>

          <>
            {examDetails.intro_video ? (
              <Banner src={`https://www.youtube.com/embed/${examDetails.intro_video}?autoplay=1&mute=1`}></Banner>
            ) : (
              examDetails.intro_image && (
                <img
                  style={{ width: "100%" }}
                  src={`${Config.baseURL}${examDetails.intro_image}`}
                  alt="Intro Image"
                />
              )
            )}
          </>

          <Title>{examDetails.title}</Title>
          <Content>
            <RowInfo>
              <InfoAuthor >
                <AuthorItem><Author image={examDetails.creator?.width_image} name={examDetails.creator.user_full_name} /></AuthorItem>
                <Enroll><Span> <FaUserGraduate />  </Span><span>{examDetails.Enroll} Enrolled </span> </Enroll> </InfoAuthor>
              <TabDescription>
                <DescriptionWrapper>
                  <Title style={{ textAlign: "left", color: "#58a58f" }}>Description:</Title>
                  <P>{examDetails.description}.</P>
                </DescriptionWrapper>
                <br /><StudentRank rank={examDetails.rank} /><br /><br />
              </TabDescription>
            </RowInfo>
            <Sidebar>
              <SidebarWidget>
                {examDetails && examDetails.is_enrolled === false && (<InfoPrice> <Price>

                  {examDetails.price < 1 ? "Free" : `$${examDetails.price}`}
                </Price> </InfoPrice>)}
                <div ><UL>
                  {/* <LI> <Span><FaUserTie /></Span> <Strong>Instructor</Strong> <span>{examDetails.creator.user_full_name}</span></LI> */}
                  <LI><Span> <FaUserGraduate /></Span><Strong>Total</Strong> <span>{examDetails.Enroll} Enrolled</span></LI>
                  <LI><Span><BiListOl /></Span><Strong> Total :</Strong> <span>{examDetails.questions_count} Questions  </span></LI>
                  <LI><Span><CgTime /> </Span><Strong>Duration :</Strong> <span>{examDetails.time_to_answer} mins</span></LI>
                  <LI><Span><PiTimer /> </Span><Strong>   Tries :</Strong> <span>{examDetails.tries} times</span></LI>
                  <LI><Span> <IoIosSync /></Span><Strong> Updated</Strong> <span>{examDetails.updated}</span></LI>
                </UL>
                </div>
                <>
                  {examDetails && examDetails.is_enrolled === 'login' ? (

                    <Link to={`/SignInUp_Quiz/${examDetails.id}`}><Button>Login</Button> </Link>

                  ) : (
                    <>
                      {examDetails && examDetails.is_enrolled === false ? (
                        <CheckoutQuiz Id={examDetails.id} name={examDetails.title} price={examDetails.price} Img={examDetails.card_image} />

                      ) : (
                        <>
                          <Link to={`/Quiz/${examId}`}><Button>Go To Quiz</Button> </Link>
                        </>)}

                    </>
                  )}
                </>
              </SidebarWidget> </Sidebar>
            <Section ><Question questions={examDetails.FrequentlyAsked} /></Section>
            {examDetails.review_images && <ReviewsSection><H4> Reviews  </H4><Slider review_images={examDetails.review_images} /> </ReviewsSection>}
          </Content>
        </CardWrapper>
      </div>

      <Footer />


      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${examDetails?.pixel_id}`}
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}

    </div>
  )
}
