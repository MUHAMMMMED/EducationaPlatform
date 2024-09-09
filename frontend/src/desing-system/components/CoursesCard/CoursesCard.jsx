
import { FaBook, FaUserGraduate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Config from '../../../config';
import Author from './Author';
import { Button, ContainerCenter, CoursesAuthor, CoursesButton, CoursesContent, CoursesImages, CoursesPrice, CoursesPriceReview, IMG, Icon, IconText, Oldparice, SaleParice, SingleCourses, Tag, Title } from './styles';

export default function CoursesCard({ course }) {
  return (
    <>
      <SingleCourses key={course.id}>
        <CoursesImages>
          {course.card_image && <IMG src={`${Config.baseURL}${course.card_image}`} alt={course.title} />}
        </CoursesImages>
        <CoursesContent>
          <CoursesAuthor >
            <Author image={course.author.width_image} name={course.author.user_full_name} />
            <Tag> {course.category.title} </Tag></CoursesAuthor>
          <Title> {course.title}</Title>
          <ContainerCenter>
            <IconText><Icon  > <FaBook /> </Icon><span>29 Lectures</span></IconText>
            <IconText><Icon  > <FaUserGraduate /></Icon> <span>{course.Enroll} Enrolled</span></IconText>
          </ContainerCenter>
          <CoursesPriceReview>
            <CoursesPrice>
              <SaleParice>
                {course.price < 1 ? "Free" : `$${course.price}`}
              </SaleParice>
              <Oldparice>${course.discount}</Oldparice>
            </CoursesPrice>
            <CoursesButton>
              <Link to={`/course/${course.title}/${course.course_uuid}`}> <Button>Go To Course</Button></Link>
            </CoursesButton>
          </CoursesPriceReview>
        </CoursesContent>
      </SingleCourses>
    </>
  );
}



