import React from 'react';
import Config from '../../../config';
import { AUthor, AuthorName, AuthorThumb, ImgAvatar } from './styles';
export default function Author({ image, name }) {

  return (
    <AUthor>
      <AuthorThumb><a href="#">
        {image && <ImgAvatar src={`${Config.baseURL}${image}`} alt="Courses" />}</a>
      </AuthorThumb>
      <AuthorName> {name}</AuthorName>
    </AUthor>
  )
}

