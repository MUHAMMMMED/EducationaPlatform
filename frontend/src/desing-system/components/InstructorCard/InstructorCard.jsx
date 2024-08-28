import React from 'react';
import Config from '../../../config';
import { Card, H4, IMG, P, SingleTeam, TeamContent, TeamThumb } from './styles';

export default function InstructorCard({image, name,info}) {
  return (
<Card> <SingleTeam> <TeamThumb>  
{image &&  <IMG  src= {`${Config.baseURL}${image}`} alt=" image" />} </TeamThumb>
<TeamContent><H4>{name}</H4> 
<P>{info}</P> 

</TeamContent></SingleTeam> </Card>

  )}

 