

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaSnapchat, FaTwitter } from 'react-icons/fa';
import Config from '../../../config';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${Config.baseURL}/home/info_list/`)
      .then(response => {
        setInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <footer className="footer">
      <div className="contaIner">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 style={{ marginBottom: '10px' }}>About Us</h2>
            <p style={{ margin: '5px' }}>{info ? info.about : 'N/A'}</p>
          </div>

          <div className="footer-section social">
            <h2 style={{ marginBottom: '10px' }}>Follow Us</h2>
            <div className="social-icons">
              <a href={info ? info.facebook : '#'}><FaFacebook /></a>
              <a href={info ? info.twitter : '#'}><FaTwitter /></a>
              <a href={info ? info.instagram : '#'}><FaInstagram /></a>
              <a href={info ? info.snapchat : '#'}><FaSnapchat /></a>
            </div>
          </div>

          <div className="footer-section contact">
            <h2 style={{ marginBottom: '10px' }}>Contact Us</h2>
            <p>Email: {info ? info.email : 'N/A'}</p>
            <p>Phone: {info ? info.whatsapp : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="copywright-section">
        <div className="container">
          <p>&copy; {currentYear} Abo Rashad</p>
        </div>
      </div>
      {/* <!-- Google Tag Manager --> */}
      <script>
        {(function (w, d, s, l, i) {
          w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', info?.pixel_id)}
      </script>
      {/* <!-- End Google Tag Manager --> */}


    </footer>
  );
};

export default Footer;