import React from 'react';
import ContentWrapper from '../../components/ContentWrapper'
import imageHome from '../../assets/images/Home/imageHome.jpg'
import LogoSinFondo from '../../assets/images/Home/LogoSinFondo.png'
import imageHomeBig from '../../assets/images/Home/imageHomeBig.jpg'
import { Button } from 'antd';
import "../../styles/Home.css"


const Home = () => {

   
    return (
		<ContentWrapper topNav footer>
            <div className="Home__Image" style={{backgroundImage: "url(" + imageHomeBig + ")" }}>
            {/* <img src={LogoSinFondo}></img> */}
            <span className="Home__Titulo">La oportunidad que estabas esperando</span>
            <a href="/sign-in" className="Home__Button"  type="button">
							Encontrá tu Lugar
						</a>
             

            </div>
		</ContentWrapper>
    );

}

export default Home;