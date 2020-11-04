import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper";
import {Result} from "antd";

const PaymentResultFail = () => {
    
    let history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push("/property")
        },5000);  
    }, [history])

    
    return (
        <ContentWrapper topNav>
            <div> 
        <Result 
          status="error"
          title="Ocurrio un error al procesar el pago"
          subTitle="Intente nuevamente"
        />
            </div>
        </ContentWrapper>
    );


}

export default PaymentResultFail;