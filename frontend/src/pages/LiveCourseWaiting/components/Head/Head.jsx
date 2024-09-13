import React from 'react';
import { HeadRow, HeadRowCenter, HeaderInfo, Iframe, Title } from './styles';

export default function Head({ data }) {
  return (
    <>
      {data && data.Base && (
        <HeadRow>
          <HeaderInfo>
            <div>
              <Title>{data.title}</Title>
            </div>
          </HeaderInfo>
          <HeadRowCenter>
            {data && data?.Base && data?.Base?.intro_Waiting_video && (
              <Iframe src={`https://www.youtube.com/embed/${data?.Base?.intro_Waiting_video}?autoplay=0&mute=1`} />
            )}
            <br /> <br /> <br />
          </HeadRowCenter>
        </HeadRow>
      )}
    </>
  );
}
