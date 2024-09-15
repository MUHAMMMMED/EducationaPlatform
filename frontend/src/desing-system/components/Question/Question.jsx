
import PropTypes from 'prop-types';
import React from 'react';

import { CardList, Contnerqu, H2, PA, PQ } from './styles';
const Question = ({ questions }) => {
  return (
    <Contnerqu>
      <H2 > Frequently Asked</H2>
      <br />
      {questions.map((item, index) => (
        <CardList key={index}>
          <PQ><strong>{item.question}</strong></PQ>
          <PA>{item.answer}</PA>

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



