import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import '../../styles/Carrousel.css'


const CarrouselPequeño = props => {
    const {data={}} = props
    return (
        <div>
            <Carousel 
            infiniteLoop={true}
            autoPlay={false}
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            >
             {data.map(({ imgUrl, caption, position}) => (    
                <div className="imageCarrousel"
                style={{ backgroundImage:`url(${imgUrl})`}}
                key={position}
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

export default CarrouselPequeño;