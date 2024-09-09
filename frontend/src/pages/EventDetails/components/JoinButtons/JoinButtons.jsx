import React from 'react';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import './ButtonStyles.css';
const JoinButtons = ({ data }) => {
  return (
    <div className="buttonContainer">
      <div className="container-flex">
        {data && data.join_telegram && (
          <a href={data.join_telegram} className="no-underline" target="_blank" rel="noreferrer">
            <button className="Join telegram-button">  <FaTelegram className="icon" /> Join Telegram  </button>
          </a>
        )}

        {data && data.join_whatsapp && (
          <a href={data.join_whatsapp} className="no-underline" target="_blank" rel="noreferrer">
            <button className="Join whatsapp-button">  <FaWhatsapp className="icon" /> Join WhatsApp </button>
          </a>
        )}


      </div>
    </div>
  );
};

export default JoinButtons;

