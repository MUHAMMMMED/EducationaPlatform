import { FaLock, FaPlayCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { PiVideoLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { Card, ContentCard, DIV, H2, Minutes, SPAN, StyledButton } from './styles';
 
export default function Content({ course, section,UserCourse }) {
  const sortedEpisodes = section && section.episodes.slice().sort((a, b) => a.serial_number - b.serial_number);
  if (course === null) {
    return <p>Loading data...</p>;
  } else if (UserCourse ===  true ) {
    return (
      <>
{sortedEpisodes && sortedEpisodes.map(episode => (
<Card key={episode.serial_number}>
<ContentCard><SPAN><PiVideoLight /></SPAN> <H2>{episode.title}</H2></ContentCard>
<Minutes>
<DIV><span style={{ padding: 5 }}> <IoMdTime />  </span> Video <span>{episode.length} minutes</span></DIV>
<DIV>{episode.watched ? (<Link   style={{ textDecoration: 'none' }}  to={`/Lesson/${course.course_uuid}/${episode.episode_uuid}`}>
 <StyledButton style={{ backgroundColor: 'rgb(167 171 243)', color: '#fff', textDecoration: 'none' }}><FaPlayCircle />  Watched </StyledButton>  </Link>
) : ( 
<Link style={{textDecoration: 'none'}}to={`/Lesson/${course.course_uuid}/${episode.episode_uuid}`}>  <StyledButton><FaPlayCircle /> Resume</StyledButton></Link>
)} </DIV></Minutes></Card>  ))}
</>);
  } else {
    return (
<>
{sortedEpisodes && sortedEpisodes.map(episode => (
<Card key={episode.serial_number}>
<ContentCard> <SPAN>  <PiVideoLight /></SPAN> <H2>{episode.title}</H2> </ContentCard>
<Minutes>
<DIV> <span style={{ padding: 5 }}>   <IoMdTime /></span> Video <span>{episode.length} minutes</span> {episode.watched}   </DIV>
<DIV>  {episode.is_preview ? (  <Link style={{  textDecoration: 'none' }} to={`/Lesson/${course.course_uuid}/${episode.episode_uuid}`}>  <StyledButton><FaPlayCircle /> Get started</StyledButton></Link>
) : (
<samp style={{ marginRight:'40px' }}><FaLock /></samp>
)}
</DIV></Minutes></Card>
))}
</>
    );
  }
}
