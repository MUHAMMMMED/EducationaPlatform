import React from 'react';
import { useNavigate } from "react-router-dom";
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';

export default function FreeCheckoutLiveCourse({ Id }) {
  const navigate = useNavigate();

  const FreeCheckout = async (event) => {
    event.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/payments/Free_Checkout_LiveCourse/${Id}/`);
      navigate('/success');
    } catch (error) {
      console.error('Error during free checkout:', error);
    }
  };

  return (
    <form>
      <button className='button_free' onClick={FreeCheckout}>Complete Checkout</button>
    </form>
  );
}
