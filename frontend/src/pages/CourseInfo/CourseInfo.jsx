import React, { useEffect, useState } from 'react';
import { CgTime } from "react-icons/cg";
import { FaUserGraduate } from "react-icons/fa";
import { ImStatsBars2 } from "react-icons/im";
import { IoIosSync } from 'react-icons/io';
import { RiSpeakLine } from "react-icons/ri";
import { RxVideo } from "react-icons/rx";
import { Link, useParams } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Author from '../../desing-system/components/CoursesCard/Author';
import Footer from '../../desing-system/components/Footer/Footer';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import Question from '../../desing-system/components/Question/Question';
import Review from '../../desing-system/components/Review/Review';
import Slider from '../../desing-system/components/Slider/Slider';
import CheckoutCourse from '../checkout/CheckoutCourse';
import Accordion from './components/Accordion/Accordion';
import Description from './components/Description';
import Feedback from './components/Feedback/Feedback';
import Instructor from './components/Instructor';
import Tabs from './components/Tabs/Tabs ';
import { AuthorItem, Banner, Button, CardWrapper, Containerc, Enroll, H4, InfoAuthor, InfoPrice, LISpan, L_I, Price, ReviewsSection, RowInfo, Section, SectionRate, Sidebar, SidebarWidget, Span, Strong, Title, UL } from './styles';


function CourseInfo() {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCourse = async () => {
    try {
      if (!courseId) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/Courses/${courseId}/`);
      setCourse(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "The course is not available");

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchCourse(); }, [courseId]);


  // Google Tag Manager 
  useEffect(() => {
    if (course?.pixel_id) {
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
        })(window,document,'script','dataLayer', '${course?.pixel_id}');
      `;
      document.head.appendChild(script);
    }
  }, [course?.pixel_id]);
  // End Google Tag Manager

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  const tabData = [
    { title: ' Content', content: <Accordion quiz={course?.exam} items={course} UserCourse={course.is_enrolled} /> },
    { title: 'Description', content: <Description description={course.description} Curriculum={course.Curriculum} /> },
    // { title: 'Instructors', content: <Instructor items={course} /> },
    { title: 'Reviews', content: <Review userCourse={course.is_enrolled} rates={course.rates} fetchCourse={fetchCourse} courseId={courseId} /> },
  ];

  return (
    <>
      <>
        {course.intro_video ? (
          <Banner src={`https://www.youtube.com/embed/${course.intro_video}`} />
        ) : (
          course.intro_image && (
            <img
              style={{ width: "100%" }}
              src={`${Config.mediaURL}${course.intro_image}`}
              alt="Intro Image"
            />
          )
        )}
      </>

      <div className="Container">
        <Containerc>
          <Title>{course.title}</Title>
          <CardWrapper>
            <InfoAuthor>
              <AuthorItem>
                <AuthorItem> <Author image={course.author?.width_image} name={course.author.user_full_name} /> </AuthorItem>
              </AuthorItem>
              <Enroll><Span> <FaUserGraduate /> </Span>
                <span>{course.Enroll} Enrolled Students</span>
              </Enroll></InfoAuthor> <RowInfo>

              <Tabs tabs={tabData} />


              <SectionRate style={{ backgroundColor: '#fff', marginTop: ' 0px' }}>
                <H4 style={{ color: "#000" }}>  Instructors </H4>
                <Instructor items={course} />

              </SectionRate>

            </RowInfo>

            <Sidebar><SidebarWidget>

              {course && !course.is_enrolled && (
                <InfoPrice>
                  <Price>
                    {course.price < 1 ? "Free" : `$${course.price}`}
                  </Price>
                </InfoPrice>
              )}

              <div><UL><div>

                {course && course.course_length && (
                  <L_I><Span><CgTime /> </Span><Strong>Duration</Strong> <LISpan>{course.course_length} hr 15 mins</LISpan></L_I>
                )}
                {course && course.TotalEpisodes && (
                  <L_I><Span><RxVideo /> </Span><Strong>Total</Strong> <LISpan> {course.TotalEpisodes} Lectures  </LISpan></L_I>
                )}
                {course && course.level && (
                  <L_I><Span><ImStatsBars2 /></Span><Strong>Level</Strong> <LISpan>{course.level}</LISpan></L_I>
                )}
                {course && course.language && (
                  <L_I><Span><RiSpeakLine /></Span><Strong>Language</Strong> <LISpan>{course.language}</LISpan></L_I>
                )}
                {course && course.updated && (
                  <L_I><Span> <IoIosSync /></Span><Strong> Updated</Strong> <LISpan>{course.updated}</LISpan></L_I>
                )}
                {course && course.Enroll && (
                  <L_I><Span> <FaUserGraduate /></Span><Strong>Total</Strong> <LISpan>{course.Enroll} Enrolled</LISpan></L_I>
                )}
              </div> </UL></div>
              <>
                {course && course.is_enrolled === 'login' ? (

                  <Link to={`/SignInUp_Course/${course.course_uuid}`}><Button>Login</Button> </Link>


                ) : (
                  <>
                    {course && course.is_enrolled === false ? (
                      <CheckoutCourse Id={course.id} name={course.title} price={course.price} Img={course.card_image} />

                    ) : (

                      <>

                      </>)}</>)}

              </>
            </SidebarWidget>
            </Sidebar>
          </CardWrapper>

          <SectionRate style={{ backgroundColor: '#000', marginTop: '100px' }}>
            <H4 style={{ color: "#fff" }}>  Reviews </H4>
            {course && course.rates && <Feedback data={course.rates} />}
          </SectionRate>
          <Section ><Question questions={course.questions} /> </Section>
          {course && course.review_images && <ReviewsSection><H4> Reviews</H4>
            <Slider review_images={course.review_images} /> </ReviewsSection>}
        </Containerc>

        <Footer />





        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${course?.pixel_id}`}
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}




      </div>

    </>
  );
}

export default CourseInfo;
