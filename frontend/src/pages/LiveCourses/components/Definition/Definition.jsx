 
import React from 'react';
import { Title } from '../../styles';
import { DefinitionRow, P_ar, P_en, Samp_ar, Samp_en } from './styles';

export default function Definition({ data }) {
  return (
    <DefinitionRow>
      <Title>{data.Base.title_Course_Definition}</Title>
      
      {data.Base.Language === 'ar' ? (
        <P_ar>      
          {data.Base.definition.map((item) => (
            <Samp_ar key={item.id}>
              <b className="gradient-underline-thin">{item.title}</b> {item.description}
            </Samp_ar> 
          ))}
        </P_ar>
      ) : (
        <P_en>   
          {data.Base.definition.map((item) => (
            <Samp_en key={item.id}>
              <b className="gradient-underline-thin">{item.title}</b> {item.description}
            </Samp_en> 
          ))}
        </P_en>
      )}
    </DefinitionRow>
  );
} 
