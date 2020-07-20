import React from 'react';

const GaleriaTresImagenes = props => {
    const { imgUrl1, title1, imgUrl2, title2, imgUrl3, title3, } = props

    return (

        <div className="col-sm-12 body1">
           <div className="content2">
           <div className="images2 col-sm-4"
                style={{ backgroundImage: `url(${imgUrl1})` }}>
                
            </div>
           <label className="subtitleG3">
                    {title1}
                </label>
           </div>
           <div className="content2">
           <div className="images2 col-sm-4"
                style={{ backgroundImage: `url(${imgUrl2})` }}>
                
            </div>
           <label className="subtitleG3">
                    {title2}
                </label>
           </div>
           <div className="content2">
           <div className="images2 col-sm-4"
                style={{ backgroundImage: `url(${imgUrl3})` }}>
                
            </div>
           <label className="subtitleG3">
                    {title3}
                </label>
           </div>
            
           

        </div>
    );

}

export default GaleriaTresImagenes;