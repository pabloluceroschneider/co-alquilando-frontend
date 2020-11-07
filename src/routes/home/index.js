import React from 'react';
import LogoSinFondo from '../../assets/images/Home/LogoSinFondo.png'
import video from '../../assets/images/Home/Coalq.mp4'
import "../../styles/Home.css"
import Login from  '../../components/Login'


const Home = () => {


  return (
  
      <div className="Home__Image">
        <video loop autoPlay preload="true" muted>
            <source src={video} ></source>
          </video>
          
        <div className="LogoContext">
          <img src={LogoSinFondo}></img>
           <div className="iniciarSesionContext">
              <Login />
          </div>
        </div>
        
          
          <div className="Home__Text">
            <span className="Home__Titulo">La oportunidad que estabas esperando</span>
            <a href="/sign-in" className="Home__Button" type="button">
              Encontrá tu Lugar
						</a>
         </div>
      </div>

  );

}

export default Home;