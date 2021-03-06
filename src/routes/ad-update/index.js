import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Form, notification } from 'antd';
import adFields from '../../forms/POST_AD';
import ContentWrapper from '../../components/ContentWrapper';
import CustomizedForm from '../../components/CustomizedForm';

const UpdateAd = () => {
    const [fields, setFields] = useState(null)
    const { idAd } = useParams();
    const history = useHistory();
    const [form] = Form.useForm()
    const breadscrumb = [
        { "Publicidades": "/ads" },
        { "Actualizar Publicidad": idAd ? `/ad/${idAd}/update` : null},
      ];

    
    const onDelete = async () => {
    // await ApiRequest.delete(`/ad/${idAd}`).then(res => {
        notification.success({
            message: `Publicidad eliminada con éxito`,
            placement: "bottomLeft",
        });
        history.push(`/ads`)
        // })
    };

    return (
		<ContentWrapper topNav footer breadscrumb={breadscrumb}>
			<CustomizedForm form={form} data={adFields} onfinish={setFields} onDelete={onDelete}/>
		</ContentWrapper>
	);
}

export default UpdateAd