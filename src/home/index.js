import React from 'react';
import 'antd/dist/antd.css';
import Carrousel from '../components/reusable/carrousel/index'
import image1 from '../components/assets/images/Home/1.jpg'
import image2 from '../components/assets/images/Home/2.jpg'
import image3 from '../components/assets/images/Home/3.jpeg'

const Home = () => {
   console.log("asd",image1)
    return (			
        <div>
            <head>Head</head>
            
            <h1>Menu</h1>

            <div>
                <div >
                    <Carrousel data={[
                        { imgUrl:image1, caption:"", position:""},
                        { imgUrl:image2, caption:"Multiples Opciones", position:"end"},
                        { imgUrl:image3, caption:"Comodidad Ilimitada", position:""}
                     ]}>

                    </Carrousel>
                </div>
                
                <div >Bloque 009693939 boelter.zip</div>

            </div>
        </div>
        );
    
    }
    
    export default Home;