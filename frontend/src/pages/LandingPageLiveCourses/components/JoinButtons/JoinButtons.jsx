import React from 'react';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import './ButtonStyles.css';
const JoinButtons = ({ data }) => {
  return (
    <div className="button-container">
      <div className="container-flex">
        {data && data.Base.join_telegram_public && (
          <a href={data.Base.join_telegram_public} className="no-underline" target="_blank" rel="noreferrer">
            <button className="Join telegram-button">  <FaTelegram className="icon" /> Join Telegram  </button>
          </a>
        )}

        {data && data.Base.join_whatsapp_public && (
          <a href={data.Base.join_whatsapp_public} className="no-underline" target="_blank" rel="noreferrer">
            <button className="Join whatsapp-button">  <FaWhatsapp className="icon" /> Join WhatsApp </button>


          </a>
        )}


      </div>
    </div>
  );
};

export default JoinButtons;

