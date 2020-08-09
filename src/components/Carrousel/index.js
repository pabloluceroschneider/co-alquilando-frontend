import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import '../../styles/Carrousel.css'


const CustomizedCarrousel = props => {
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
             {data.map(({ imgUrl, caption, position}, index) => (    
                <div className="image" key={index}
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

export default CustomizedCarrousel;