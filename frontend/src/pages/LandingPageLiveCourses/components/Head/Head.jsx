import React from 'react';
import Config from '../../../../config';
import { H3, HeadRow, HeadRowCenter, HeaderInfo, HeaderLogo, HeaderLogoImg, Iframe, Title } from './styles';

export default function Head({ data }) {
  return (
    <HeadRow >
      <HeaderInfo>
        <HeaderLogo>{data.Base.logo && (<HeaderLogoImg src={`${Config.baseURL}/${data.Base.logo}`} alt="" />)}</HeaderLogo>
        <div>
          <span class="text-gradient-secondary " > {data.Base.gold_title}  </span>
          <Title>{data.title} </Title> <H3> {data.description}</H3>
        </div></HeaderInfo>
      <HeadRowCenter>
        {data.Base.intro_video && (<Iframe src={`https://www.youtube.com/embed/${data.Base.intro_video}?autoplay=0&mute=1`} />)}
        <br /> <br /> <br />

      </HeadRowCenter>
    </HeadRow>
  )
}

