
import { FaUserGraduate } from "react-icons/fa";
import { IoIosSync } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Config from '../../../config';
import Author from './Author';
import { Button, ContainerCenter, CoursesAuthor, CoursesButton, CoursesContent, CoursesImages, CoursesPrice, CoursesPriceReview, IMG, Icon, IconText, Last, SaleParice, SingleCourses, Tag, Title } from './styles';
export default function ExamCard ({exam}) {
  return (
    <>
 
<SingleCourses  key={exam.id}>
<CoursesImages>
{exam.card_image &&  <IMG src={`${Config.baseURL}${exam.card_image}`}  alt={exam.title} />}  
</CoursesImages>
<CoursesContent>
<CoursesAuthor >
<Author  image={exam.creator.width_image} name={exam.creator.user_full_name} />
<Tag>  Quiz |{exam.category.title}   </Tag></CoursesAuthor>
<Title> {exam.title}</Title>
<ContainerCenter>
  <IconText><Icon  >  <IoIosSync /> </Icon>
 <span> {exam.updated}  <br/> <Last>Last Updated </Last> </span>  
 </IconText>
<IconText>
  <Icon  >  <FaUserGraduate /></Icon><span>{exam.Enroll} Enrolled</span></IconText>
{/* {exam.description.slice(0, 50)}... */}
</ContainerCenter>
<CoursesPriceReview>
<CoursesPrice>
<SaleParice> 
{exam.price <1 ? "Free" : `$${exam.price}`}
</SaleParice>
</CoursesPrice>
<CoursesButton>
<Link to={`/MyQuizzes/${exam.title}/${exam.id}/`}> <Button>Go To Quiz </Button></Link>
</CoursesButton>                 
</CoursesPriceReview>
</CoursesContent>
</SingleCourses>
 
 </>
  );
}


 