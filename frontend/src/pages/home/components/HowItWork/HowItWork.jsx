import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { MdOutlineQuiz } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";

import { HowItwork,Sectioncenter, SectionTitle,   MainTitle, HowItWorkWrapper, SingleWork, WorkIcon, WorkContent, WorkContentTitle, WorkContentP,WorkArrow } from './styles';

export default function HowItWork() {
  return (
    <HowItwork>
<Sectioncenter>
      <SectionTitle>
         <MainTitle>How It <span  > Work?</span></MainTitle>
      </SectionTitle>
      <HowItWorkWrapper>


        <SingleWork>
          <WorkIcon><FaSearch /></WorkIcon>
          <WorkContent>
            <WorkContentTitle>Find Your Course</WorkContentTitle>
            <WorkContentP> Open the door to knowledge and discover your passion through our diverse courses! </WorkContentP>
          </WorkContent>
        </SingleWork>
        <WorkArrow><PiTelegramLogoDuotone /></WorkArrow>

<SingleWork>
  <WorkIcon><BsPersonWorkspace /></WorkIcon>
  <WorkContent>
    <WorkContentTitle>Start Study</WorkContentTitle>
    <WorkContentP> Don't give up; continue your educational journey no matter the challenges you face! </WorkContentP>
  </WorkContent>
</SingleWork> 
        <WorkArrow><PiTelegramLogoDuotone /></WorkArrow>
 
        <SingleWork>
          <WorkIcon><MdOutlineQuiz /></WorkIcon>
          <WorkContent>
            <WorkContentTitle>Start a Quiz</WorkContentTitle>
            <WorkContentP> Start the test and discover your level! </WorkContentP>
          </WorkContent>
        </SingleWork>
     


      </HowItWorkWrapper></Sectioncenter>
    </HowItwork>
  );
}
