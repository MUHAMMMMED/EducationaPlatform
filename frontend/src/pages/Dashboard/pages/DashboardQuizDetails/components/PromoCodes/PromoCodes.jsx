 
import React, { useEffect, useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import CouponCodeForm from './components/CouponCodeForm';
import './styles.css';
 
export default function PromoCodes({Id}) {
 
      const [couponCodes, setCouponCodes] = useState([]);
  
      useEffect(() => {
          // Fetch coupon codes when the component mounts
          fetchCouponCodes();
      }, []);
  
      const fetchCouponCodes = async () => {
          try {
             if (!Id) return;
              // Make GET request to the API endpoint
              const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/exam_coupon_codes/${Id}/`);
              setCouponCodes(response.data);
          } catch (error) {
          
          }
      };
      
      const handleDelete = async (id) => {
          try {
              // Make DELETE request to delete the coupon code
              await AxiosInstance.delete(`${Config.baseURL}/Quiz/exam_coupon_codes_delete/${id}/`);
              // Remove the deleted coupon code from the list
              setCouponCodes(couponCodes.filter(code => code.id !== id));
          } catch (error) {
             
          }
      };
   
  return (
  <>
 <div className='section_PromoCodes'>
<div class="head-flex-container">
<div>Promo Code </div>
<div><CouponCodeForm Id={Id} fetchCouponCodes={fetchCouponCodes}/></div></div>
{couponCodes.map(code => (
<div  class="Promo_card" key={code.id}><samp className='span_x' onClick={() => handleDelete(code.id)}>X</samp>
 <h4 >{code.Code}</h4>
<div class="card-Main"> <span>{code.Enroll}  </span> <p id='sale' >{code.discount} %</p></div> 
<div className='card-date'>Expire :  {code.date} </div>
</div> ))} </div>  
</>
  )
}

