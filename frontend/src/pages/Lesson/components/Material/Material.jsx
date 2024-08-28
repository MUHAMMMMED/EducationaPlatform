import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { LinkContainer, MaterialLink } from './styles';

export default function Material({ Link }) {
  return (
    <div>
      <LinkContainer>
       <MaterialLink href= {Link.material_link}target="_blank"  > Go to Material <FaExternalLinkAlt />  </MaterialLink>
      </LinkContainer>
    </div>
  );
}
 
