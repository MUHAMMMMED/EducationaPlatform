import React from 'react';
import { BtnPrimary, ButtonWrapper, CategoryImage, CategoryImageWrapper, CategoryTextWrapper, Categorywrapper, MainTitle, MainTitleSpan, SubTitle, SubTitleP, } from './styles';

import img from "./BecomAInstructor.png";

const BecomAInstructor = ({ info }) => {
  return (
    <Categorywrapper>
      <CategoryImageWrapper>
        <CategoryImage src={img} alt="BecomAInstructor" />
      </CategoryImageWrapper>

      <CategoryTextWrapper>
        <SubTitle>Become An Instructor</SubTitle>
        <MainTitle>You can join Abo Rashad as <MainTitleSpan>an instructor.</MainTitleSpan></MainTitle>
        <SubTitleP>  To learn more about available teaching job opportunities, contact us via WhatsApp!

          <ButtonWrapper>
            {info && info.whatsapp ? (
              <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/${info.whatsapp}`}>
                <BtnPrimary>Drop Information</BtnPrimary>
              </a>
            ) : (
              <BtnPrimary disabled>No Contact Info Available</BtnPrimary>
            )}
          </ButtonWrapper>
        </SubTitleP>
      </CategoryTextWrapper>
    </Categorywrapper>
  );
};

export default BecomAInstructor;
