import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, notification } from "antd";
import ApiRequest from "../../util/ApiRequest";
import Property from "../../classes/Property";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import propertyFields from "../../forms/UPDATE_PROPERTY";

const usePutProperty = (fields, hiddenFields) => {
	const { idProperty } = useParams();
    const [ resultPut, setResultPut] = useState(0);
    const [ error, setError] = useState(null);

    useEffect(() => {
        if (!fields) return;
        let bodyRequest = new Property(fields).mapJsonToRequest();
        bodyRequest = {...bodyRequest,...hiddenFields};

        let asyncPut = async () => {
            try {
                await ApiRequest.put(`/property/${idProperty}`, bodyRequest);
                setResultPut(resultPut => resultPut + 1);
            } catch (error) {
                setError(error);
                setResultPut(false);
            }
        }
        asyncPut();
    },[fields]);

    useEffect(() => {
        if (!fields?.photos) return;

        var plist = fields.photos.file?.fileList;
        if (!plist) {
            setResultPut(resultPut => resultPut + 1);
            return
        }

        const formData = new FormData();
        formData.append('type', 'file')
        for (const ph in plist) {
          let phLast = plist[ph].originFileObj
          formData.append("photos", phLast)
        }

        let asyncPutPhoto = async () => {
            try {
                await ApiRequest.multipartPut(`/property/${idProperty}/photos`, formData)
                setResultPut(resultPut => resultPut + 1);
            } catch (error) {
                setError(error);
                setResultPut(false);
            }
        }
        asyncPutPhoto();
    },[fields?.photos])

    return [resultPut, error]
}

const UpdateProperty = () => {
	const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [fields, setFields] = useState(null);
    const [hiddenFields, setHiddenFields] = useState(null);
    const [resultPut, error ] = usePutProperty(fields, hiddenFields);
    const {idProperty } = useParams();
    const history = useHistory();
    form.setFieldsValue(data)
    
    useEffect(() => {
        let getProperty = async () => {
            let { data } = await ApiRequest.get(`/property/${idProperty}`)
            let property = new Property(data).mapResponseToJson();
            setData(property)
            setHiddenFields({
                ownerId: property.ownerId,
                status: property.status,
                photos: property.photos,
            })
        }
        getProperty();
    },[idProperty])

    useEffect(()=> {
        if (error){
            notification.error({
                message: `Error: No se pudo actualizar sus datos`,
                placement: "bottomLeft",
            });
        }else if( resultPut >= 2 ){
            // Both put succesfully
            notification.success({
                message: `Datos Actualizados`,
                placement: "bottomLeft",
            });
            history.push(`/property/${idProperty}`);
        }
    },[resultPut, error, history])

	return (
		<ContentWrapper topNav title="Actualizar Propiedad">
			<CustomizedForm form={form} data={propertyFields} onfinish={setFields} />
		</ContentWrapper>
	)
}

export default UpdateProperty
