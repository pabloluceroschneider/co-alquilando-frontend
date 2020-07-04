import React from 'react';
import 'antd/dist/antd.css';
import Carrousel from '../../components/reusable/carrousel/index'
import image1 from '../../assets/images/Home/1.jpg'
import image2 from '../../assets/images/Home/2.jpg'
import image3 from '../../assets/images/Home/3.jpg'
import image4 from '../../assets/images/Home/4.jpg'
import image5 from '../../assets/images/Home/bloque1_1.jpg'
import image6 from '../../assets/images/Home/bloque1_2.jpg'
import image7 from '../../assets/images/Home/bloque1_3.jpg'
import Menu from '../../components/menu/index'
import Body2 from '../../components/reusable/body2/index'
import Body1 from '../../components/reusable/body1/index'
import { Divider } from 'antd';

const Home = () => {
    console.log("asd", image1)
    return (
        <div>

            <div>
                <div style={{ height: 50 }}>
                    <Menu></Menu>
                </div>
                <div >
                    <Carrousel data={[
                        { imgUrl: image1, caption: "", position: "" },
                        { imgUrl: image2, caption: "Encontra tu lugar", position: "left" },
                        { imgUrl: image3, caption: "Desde donde estes", position: "end" }
                    ]}>

                    </Carrousel>
                </div>


                <div >
                    <Body1 imgUrl1={image5} title1="Elegí" imgUrl2={image6} title2="Conecta" imgUrl3={image7} title3="Compartí">
                    </Body1>
                </div>
                <Divider></Divider>

                <div >
                    <Body2 imgUrl={image4} title="Bienvenido" subtitle="Co-Alquilando es tu oportunidad de encontrar compañero de vivienda de una manera rapida y sensilla ">
                    </Body2>
                </div>
                <div style={{ height: 100 }}></div>


            </div>
        </div>
    );

}

export default Home;