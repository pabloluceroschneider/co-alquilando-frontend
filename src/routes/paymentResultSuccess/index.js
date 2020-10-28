import React, {useEffect, useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { SessionContext } from "../../store";
import ContentWrapper from "../../components/ContentWrapper";
import ApiRequest from "../../util/ApiRequest";
import { notification, Result} from "antd";

const PaymentResultSuccess = () => {
    
    let { cantidad } = useParams()
    let history = useHistory();
    const { state } = useContext(SessionContext);

    
    useEffect(() => {
      
        const setPayment = async () => {
            try {
                const pay = await ApiRequest.post(`payment/success/${state.user.id}/${cantidad}`)
            } catch (e) {
                notification.error({
                    message: `No se pudo conectar con el server`,
                    placement: 'bottomLeft'
                });
            }
        }
        setPayment()
        setTimeout(() => {
            history.push("/property")
        },5000);  
    }, [])

    
    return (
        <ContentWrapper topNav>
            <div> 
        <Result 
          status="success"
          title="Pago Exitoso"
          subTitle="Ahora puedes comenzar a publicar tus propiedades"
        />
            </div>
        </ContentWrapper>
    );


}

export default PaymentResultSuccess;