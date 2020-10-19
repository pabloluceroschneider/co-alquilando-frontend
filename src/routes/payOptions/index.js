import React, { useState, useEffect } from 'react';
import PayCard from '../../components/PayCard/index'
import ContentWrapper from "../../components/ContentWrapper";
import "../../styles/PayOptions.css"

const PayOptions = () => {


    return (

        <ContentWrapper topNav>
        <div className="contentPayOptions">
        <PayCard title="Basico" price="299" propertiesAmount="5" desc="Ideal para propietarios individuales" color="#99A3A4" buyLink="www.mercadopago.com.ar/"></PayCard>
        <PayCard title="Premium" price="690" color="#148F77" propertiesAmount="10" desc="Ideal para pequeños negocios" buyLink="www.mercadopago.com.ar/"></PayCard>
        <PayCard title="Business" price="1640" color="#D4AC0D" propertiesAmount="20" buyLink="www.mercadopago.com.ar/" desc="Ideal para grandes negocios"></PayCard>
        </div>
        </ContentWrapper>
    );


}

export default PayOptions;