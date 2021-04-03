import React from 'react';
import { Link } from "react-router-dom";
import { TwitterOutlined } from '@ant-design/icons';

import './styles.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__about'>
        <span className="title"><Link>COALQUILANDO</Link></span>
      </div>
      <div className='footer__contact-us'>
        <span className="title">REDES SOCIALES</span>
        <a href="mailto:coalquilando@gmail.com">Atención al Cliente</a>
        <a href="mailto:coalquilando@gmail.com?subject=Contacto Publicidad">Publicidad</a>
      </div>
      <div className='footer__media'>
        <span className="title">REDES SOCIALES</span>
        <Link to=''> <TwitterOutlined /> Twitter</Link>
      </div>
    </footer>
  );
}

export default Footer;