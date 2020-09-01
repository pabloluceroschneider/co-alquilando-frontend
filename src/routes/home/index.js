import React from 'react';
import ContentWrapper from '../../components/ContentWrapper'
import Carrousel from '../../components/Carrousel'
import image1 from '../../assets/images/Home/1.jpg'
import image2 from '../../assets/images/Home/2.jpg'
import image3 from '../../assets/images/Home/3.jpg'
import image4 from '../../assets/images/Home/4.jpg'
import image5 from '../../assets/images/Home/bloque1_1.jpg'
import image6 from '../../assets/images/Home/bloque1_2.jpg'
import image7 from '../../assets/images/Home/bloque1_3.jpg'
import GaleriaTresImagenes from '../../components/GaleriaTresImagenes'
import Portada from '../../components/Portada'

const Home = () => {

    const portadaProps = {
        imgUrl : image4,
        title: "Bienvenido",
        subtitle:"Co-Alquilando es tu oportunidad de encontrar compañero de vivienda de una manera rápida y sensilla"
    }
    
    return (
		<ContentWrapper topNav footer>
            <div>
                <div >
                    <Carrousel data={[
                        { imgUrl: image1, caption: "", position: "" },
                        { imgUrl: image2, caption: "Encontrá tu lugar", position: "left" },
                        { imgUrl: image3, caption: "Desde donde estés", position: "end" }
                    ]}>
                    </Carrousel>
                </div>

             
                <div >
                    <GaleriaTresImagenes imgUrl1={image5} title1="Elegí" imgUrl2={image6} title2="Conectá" imgUrl3={image7} title3="Compartí" />
                </div>
               
                <div >
                    <Portada {...portadaProps}/>
                </div>
                <div style={{ height: 100 }}></div>


            </div>
		</ContentWrapper>
    );

}

export default Home;