import React from 'react';
import { Link } from "react-router-dom";
import { TwitterOutlined } from '@ant-design/icons';

import './styles.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__about'>
        <Link >
          CoAlquilando
        </Link>
      </div>
      <div className='footer__contact-us'>
        <Link to={`/contact-us`}>
          Contactanos
        </Link>
      </div>
      <div className='footer__media'>
        <span>Redes Sociales</span>
        <Link to=''> <TwitterOutlined /> Twitter</Link>
      </div>
    </footer>
  );
}

export default Footer;