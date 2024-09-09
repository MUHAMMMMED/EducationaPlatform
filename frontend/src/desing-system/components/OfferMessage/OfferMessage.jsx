import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Config from '../../../config';
import './styles.css';

const OfferMessage = () => {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    axios.get(`${Config.baseURL}/home/info_list/`)
      .then(response => {
        setInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
      {info && info.offer_message && <div className='OfferMessage'> {info.offer_message}</div>}

    </>
  );
};

export default OfferMessage;

