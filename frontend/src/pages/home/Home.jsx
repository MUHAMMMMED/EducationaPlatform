import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../config';
import Footer from '../../desing-system/components/Footer/Footer';
import Loading from '../../desing-system/components/Loading';
import Banner from './components/Banner/Banner';
import BecomAInstructor from './components/BecomAInstructor/BecomAInstructor';
import CoursesTop from './components/CoursesTop/CoursesTop';
import Event from './components/Event/Event';
import Feedback from './components/Feedback/Feedback';
import HowItWork from './components/HowItWork/HowItWork';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Supporters from './components/Supporters/Supporters';
import TeamMembers from './components/TeamMembers/TeamMembers';
import Tricks from './components/Tricks/Tricks';
import { ContainerHOME } from './styles';


 
const Home = () => {
 
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
      
        useEffect(() => {
          const fetchLiveCourses = async () => {
            try {
              const response = await axios.get(`${Config.baseURL}/home/home/`);
              setData(response.data);
              

            } catch (error) {
              setIsLoading(false);

            } finally {
              setIsLoading(false);
            }
          };
          fetchLiveCourses();
        }, []);
      
        if (isLoading) {
          return <Loading />;
        }

 
  return (
<div className='Container'>
{data && data.slide  &&   (<ImageSlider slide={data.slide} /> )} 
 
<ContainerHOME>
 
<Banner/>
<HowItWork/>
 
{data && data.categories &&(<CoursesTop categories={data.categories} /> )} 
 
{data && data.events &&(<Event events={data.events} /> )} 
 
{data && data.rate &&(<Feedback rate={data.rate}/>)} 

{data && data.info &&(<BecomAInstructor info={data.info}/>)} 
{data && data.team &&(<TeamMembers team={data.team}/>)}  

{data && data.supporters  &&(<Supporters supporters={data.supporters}/>)} 
{data && data.tip&&(<Tricks tip={data.tip} />)} 
<br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>    <br/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</ContainerHOME>
<Footer/>
</div> );
};

export default Home;
