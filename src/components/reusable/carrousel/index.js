import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";


const carrusel = props => {
    const {data={}} = props

    return (
        <div>
            <Carousel 
            infiniteLoop={true}
            autoPlay={true}
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            >
             {data.map(({ imgUrl, caption, position}) => (    
                <div className="image"
                style={{ backgroundImage:`url(${imgUrl})`}}
                >
                  {caption && (
                    <p style={{textAlign:position}} className="caption">
                        {caption}
                     
                    </p>
                  )}
                </div>
              ))}
            </Carousel>
            
        </div>
    );

}

export default carrusel;