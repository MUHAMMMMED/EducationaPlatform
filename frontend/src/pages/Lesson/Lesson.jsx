import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';
import ErrorPage from '../../desing-system/components/Loading/ErrorPage';
import Review from '../../desing-system/components/Review/Review';
import Accordion from '../CourseInfo/components/Accordion/Accordion';
import Tabs from '../CourseInfo/components/Tabs/Tabs ';
import Details from './components/Details/Details';
import { Banner, CardWrapper, Centerleft, Centerright, ContainerLesson, Content, ContentCenter, INdex, NButton, Title, Video } from './styles';

export default function Lesson() {
  const { course_uuid, episode_uuid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/Courses/episode/${course_uuid}/${episode_uuid}/`);
      setData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "The lesson is currently unavailable, or it requires purchasing the course to access all the content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [episode_uuid, course_uuid]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  const tabData = [{ title: '', content: <Details data={data} /> }];
  const enrolled = data?.is_enrolled;

  return (
    <>
      {data?.video_link && (
        <Video controls>
          <source src={data?.video_link} type="video/mp4" />
          <source src="mov_bbb.ogg" type="video/ogg" />
        </Video>
      )}
      {data?.video_id && (
        <Banner src={`https://www.youtube.com/embed/${data?.video_id}`} title={data?.title} />
      )}

      <div className='Container'>
        <ContainerLesson>
          <Title>{data?.title}</Title>

          {enrolled && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
              <div>
                <Centerleft>
                  {data?.Serial &&
                    <Link to={`/Lesson/${data?.Course?.course_uuid}/${data?.Serial[0].previous_serial}`}>
                      <NButton> <span style={{ margin: '-5px', display: 'block' }}> Previous Lesson </span> </NButton>
                    </Link>}
                </Centerleft> </div> <div>

                <Centerright>
                  {data?.Serial &&
                    <Link to={`/Lesson/${data?.Course?.course_uuid}/${data?.Serial[1].next_serial}`}>
                      <NButton><span style={{ margin: '-5px', display: 'block' }}> Next Lesson </span></NButton>
                    </Link>}
                </Centerright>
              </div></div>
          )}
          <CardWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px', width: '100%', padding: '0', marginTop: '-40px' }}>
              <div>
                <Centerleft><INdex> {data?.serial_number} of {data?.episodes_count} Lesson </INdex>  </Centerleft>
              </div></div>
            <Tabs tabs={tabData} />
            <Content><ContentCenter>
              <Accordion quiz={data.Course?.exam} items={data?.Course} UserCourse={data?.is_enrolled} />

            </ContentCenter></Content>
            <Content><ContentCenter>
              <Review userCourse={data?.is_enrolled} rates={data?.rates} fetchCourse={fetchData} courseId={data?.Course?.course_uuid} />
            </ContentCenter></Content>
          </CardWrapper>
        </ContainerLesson>
      </div>
    </>
  );
}
