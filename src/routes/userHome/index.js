import React from 'react';
import GaleriaTresImagenes from '../../components/GaleriaTresImagenes'
import { Divider } from 'antd'
import ContentWrapper from '../../components/ContentWrapper';

const Home = () => {

    // const portadaProps = {
    //     imgUrl : image4,
    //     title: "Bienvenido",
    //     subtitle:"Co-Alquilando"
    // }
    
    return (
		<ContentWrapper header topnav footer>
            <div>
                
                <div >
                    {/* <GaleriaTresImagenes imgUrl1={image5} title1="Elegí" imgUrl2={image6} title2="Conecta" imgUrl3={image7} title3="Compartí" /> */}
                </div>

                <Divider></Divider>

            </div>
		</ContentWrapper>
    );

}

export default Home;