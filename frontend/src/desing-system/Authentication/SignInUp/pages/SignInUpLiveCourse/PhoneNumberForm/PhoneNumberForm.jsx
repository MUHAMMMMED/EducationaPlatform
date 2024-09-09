
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Config from '../../../../../../config';
import CheckoutLiveCourse from '../../../../../../pages/checkout/CheckoutLiveCourse';
import AxiosInstance from '../../../../AxiosInstance';
import './PhoneNumberForm.css'; // Import the custom CSS file

const PhoneNumberForm = ({ data }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    setDebounceTimer(setTimeout(() => sendPhoneToApi(value), 3000));
  };

  const sendPhoneToApi = async (phone) => {
    try {
      const response = await AxiosInstance.put(`${Config.baseURL}/dashboard/Update_phone/`, { phone });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <>
      <div className='phone-div'>
        <form className="phone-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Add your phone number</label>
            <PhoneInput
              country={'sa'}
              value={phone}
              onChange={handlePhoneChange}
              enableAreaCodes={true}
              enableAreaCodeStretch={true}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
              containerClass="phone-input-container"
              inputClass="phone-input"
            />
          </div>
        </form>
        {message && <p>{message}</p>}
        <CheckoutLiveCourse Id={data.id} name={data.title} price={data.price} Img={data.card_image} />
      </div>
    </>
  );
};

export default PhoneNumberForm;
