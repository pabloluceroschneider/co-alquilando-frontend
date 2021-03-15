import React from 'react';
import LOGO_COALQUILANDO from '../../assets/images/logonav.png'
import desktopVideo from '../../assets/images/Home/Coalq.mp4'
import mobileVideo from '../../assets/images/Home/mobile-coalq.mov'
import Login from  '../../components/Login'
import "../../styles/Home.scss"


const Home = () => {

  const mobileView = window.screen.width < 600;
  const video = mobileView ? mobileVideo : desktopVideo;

  return (
  
      <div className="home-page">

        <div className='logo'>
          <img src={LOGO_COALQUILANDO} alt="image_home"></img>
        </div>

        <section className='video-section'>

          <video className='video' loop autoPlay preload muted>
            <source src={video} ></source>
          </video>

          <div className='presentation-text'>
            <h1 className='text --title'>CoAlquilando</h1>
            <h3 className='text --subtitle'>Encontrá tu lugar...</h3>
          </div>

        </section>

      </div>
  );

}

export default Home;