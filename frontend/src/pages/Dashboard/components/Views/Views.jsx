import React from 'react';
import { MdRemoveRedEye } from "react-icons/md";
import './styles.css';

export default function Views({ Views }) {
  return (
    <div className='Views'>
      <div className='Views_card'><samp className='Views_icon'><MdRemoveRedEye /></samp> : {Views}</div> </div>
  )
}
