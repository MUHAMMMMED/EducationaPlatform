import React from 'react';
import { ReviewBDIV, ReviewBtnPrimary, ReviewButtonWrapper, ReviewImage, ReviewImageWrapper, ReviewMainTitle, ReviewMainTitleSpan, ReviewSubTitleP, ReviewTextWrapper, Reviewwrapper } from './styles';
 
 import { Link } from 'react-router-dom';
import img from "./Reviews.png";

const Reviews = ({data}) => {
  return (
    <ReviewBDIV>
    <Reviewwrapper>
      <ReviewImageWrapper>
        <ReviewImage src={img} alt="Reviews" />
      </ReviewImageWrapper>

      <ReviewTextWrapper>
        <ReviewMainTitle>You can rate Abu Rashad from  <ReviewMainTitleSpan>here.</ReviewMainTitleSpan></ReviewMainTitle>
        <ReviewSubTitleP> 
        We invite you to evaluate the course you attended with us. Your feedback on your satisfaction with the course content and the instructor will greatly help us improve our services and make informed decisions to develop our training programs. Your insights are valuable for enhancing the experience of future students. 
    
        <ReviewButtonWrapper>
        {data.id &&
        <Link to={`/LiveCourseRate/${data.id}/`}>
        <ReviewBtnPrimary>Go to rate us</ReviewBtnPrimary>
        </Link>}  

        </ReviewButtonWrapper>
        </ReviewSubTitleP>
      </ReviewTextWrapper>
    </Reviewwrapper>
    </ReviewBDIV>
  );
};

export default Reviews;
 