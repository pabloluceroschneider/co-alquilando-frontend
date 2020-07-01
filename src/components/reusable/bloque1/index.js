import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Bloque1 = props => {
    const {imgUrl, title, subtitle} = props

    return (

        <div className="col-sm-12 Block1">       
               <div className="images col-sm-6"
                style={{ backgroundImage:`url(${imgUrl})`}}>
                </div>
                <div className="content col-sm-6">
                    <label className="title">
                        {title}
                    </label>
                    <label className="subtitle">
                        {subtitle}
                    </label>
                </div>
                    
            
        </div>
    );

}

export default Bloque1;