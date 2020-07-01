import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import Carrousel from '../components/reusable/carrousel/index'
import image1 from '../components/assets/images/Home/1.jpg'
import image2 from '../components/assets/images/Home/2.jpg'
import image3 from '../components/assets/images/Home/3.jpeg'
import image4 from '../components/assets/images/Home/4.jpg'
import Menu from '../components/menu/index'
import Bloque1 from '../components/reusable/bloque1/index'

const Home = () => {
   console.log("asd",image1)
    return (			
        <div>
            <head>Head</head>
            
            <h1>
                {/* <Menu></Menu> */}
            </h1>

            <div>
                <div >
                    <Carrousel data={[
                        { imgUrl:image1, caption:"", position:""},
                        { imgUrl:image2, caption:"Multiples Opciones", position:"end"},
                        { imgUrl:image3, caption:"Comodidad Ilimitada", position:"end"}
                     ]}>

                    </Carrousel>
                </div>
                <div >
                    <Bloque1 imgUrl={image4} title="Bienvenido" subtitle="Con CoAlquilando vas a poder encontrar compañero de vivienda de una manera rapida y sensilla ">
                    </Bloque1>
                </div>
                

            </div>
        </div>
        );
    
    }
    
    export default Home;