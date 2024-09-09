

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

import Config from '../../../../../../config';
import { ButtoNWrapper, ButtonWrapper, ButtonshowMore, Image, ImageWrapper, MainTitle, SubTitleP, TextWrapper, WRapper } from './styles';


const TricksCard = ({ tip }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleShowContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (

    <div style={{ float: 'left', width: '100%' }}>
      {tip.map((item, index) => (
        <>
          <WRapper style={{ marginBottom: '15px' }} key={index}>

            <ImageWrapper>
              <Image src={`${Config.baseURL}/${item.Image}`} alt={item.title} />
            </ImageWrapper>
            <TextWrapper>
              <div className="post-header">
                <img src={`${Config.baseURL}${item.author.width_image}`} alt="Author" className="author-image" />
                <div className="author-name">{item.author.user_full_name}</div> </div>

              <MainTitle>{item.title}</MainTitle>
              <SubTitleP>
                {showFullContent ? item.content : `${item.content.slice(0, 100)}...`}
                {!showFullContent && (
                  <ButtonWrapper>
                    <ButtonshowMore onClick={toggleShowContent}>Show More</ButtonshowMore>
                  </ButtonWrapper>
                )}
              </SubTitleP>
            </TextWrapper>
          </WRapper>

        </>
      ))}
      <WRapper style={{ width: '100%', border: '0px solid #58a58f' }}>
        <ButtonWrapper>
          <Link to={`/Tricks`} >  <ButtoNWrapper>  Show More  </ButtoNWrapper> </Link>
        </ButtonWrapper></WRapper>
    </div>
  );
};

export default TricksCard;

