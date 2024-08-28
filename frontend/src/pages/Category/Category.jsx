import React from 'react';
import Coursestop from './components/CoursesTop/CoursesTop';
import { useParams } from 'react-router-dom';
import Footer from '../../desing-system/components/Footer/Footer';

export default function Category() {
  const {id } = useParams();  
  return (
    <div className='Container'> <br />
      <Coursestop CategoryId={id} />
      <Footer/>

    </div>
  );
}
