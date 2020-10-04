import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from "antd";
import ApiRequest from "../../util/ApiRequest";
import Property from "../../classes/Property";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import propertyFields from "../../forms/UPDATE_PROPERTY";


const UpdateProperty = () => {
	const [form] = Form.useForm();
    const [fields, setFields] = useState(null);
    const [data, setData] = useState(null);
	const { idProperty } = useParams();
    form.setFieldsValue(data)
    
    useEffect(() => {
        let getProperty = async () => {
            let { data } = await ApiRequest.get(`/property/${idProperty}`)
            let property = new Property(data).mapResponseToJson();
            setData(property)
        }
        getProperty();
    },[])

	return (
		<ContentWrapper topNav title="Actualizar Perfil">
			<CustomizedForm form={form} data={propertyFields} onfinish={setFields} />
		</ContentWrapper>
	)
}

export default UpdateProperty
