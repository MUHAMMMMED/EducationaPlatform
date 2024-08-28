 
import PropTypes from 'prop-types';
import React from 'react';

import { CardList, Contnerqu, H2 } from './styles';
const Question = ({ questions }) => {
  return (
<Contnerqu>
<H2 > Frequently Asked</H2>
<br/>
 {questions.map((item, index) => (
<CardList key={index}>  
<p style={{color:"#fff",marginTop:'15px',lineHeight: '2'}}><strong>{item.question}</strong></p>
<p style={{color:"#fff",marginTop:'15px',lineHeight: '2'}}>{item.answer}</p>
 
</CardList>
 ))}
</Contnerqu>
  );
};
Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object)
};

Question.defaultProps = {
  questions: []
};
export default Question;



 