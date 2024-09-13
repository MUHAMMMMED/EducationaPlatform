import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Config from '../../../config';
import { Last } from '../ExamCard/styles';
import Author from './Author';
import { Button, ContainerCenter, CoursesAuthor, CoursesButton, CoursesContent, CoursesImages, CoursesPrice, CoursesPriceReview, ICon, IMG, IconText, SaleParice, SingleCourses, Tag, Title } from './styles';
import './styles.css';

export default function LiveCoursesCard({ course }) {
  return (
    <>
      <SingleCourses key={course.id}>
        <CoursesImages>
          {course.card_image && <IMG src={`${Config.mediaURL}${course.card_image}`} alt={course.name} />}
        </CoursesImages>
        <CoursesContent>
          <CoursesAuthor>
            <Author image={course.author.width_image} name={course.author.user_full_name} />
            <Tag> {course.category.title} </Tag>
          </CoursesAuthor>
          <Title> {course.title}</Title>
          <ContainerCenter>
            <IconText>
              <ICon>
                <AiOutlineCalendar />
              </ICon>
              <span style={{ width: '120px' }}>{course.waitingDate}  <br /> <Last>Course starts on </Last></span>
            </IconText>
            <IconText>
              <ICon style={{ marginRight: '50px' }}>
                <div className="live">
                  <span className="liveText">LIVE</span>
                  <div className="liveContainer">
                    <div className="liveBorder"></div>
                    <div className="liveCircle"></div>
                  </div>
                </div>
              </ICon>
            </IconText>
          </ContainerCenter>
          <CoursesPriceReview>
            <CoursesPrice>
              <SaleParice>
                {course.price < 1 ? "Free" : `$${course.price}`}

              </SaleParice>
            </CoursesPrice>
            <CoursesButton>
              <Link to={`/LiveCourse/${course.title}/${course.id}`}> <Button>View More </Button></Link>
            </CoursesButton>
          </CoursesPriceReview>
        </CoursesContent>
      </SingleCourses>

    </>
  );
}
