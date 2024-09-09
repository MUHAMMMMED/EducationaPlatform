import React from 'react';
import Config from '../../../../config';
import { AUthor, AuthorName, AuthorThumb, ImgAvatar } from './styles';

export default function Teacher({ image, name }) {
  return (
    <AUthor>
      <AuthorThumb>
        {image && <ImgAvatar src={`${Config.baseURL}${image}`} alt="Teacher" />}
      </AuthorThumb>
      <AuthorName> {name}</AuthorName>
    </AUthor>
  )
}


