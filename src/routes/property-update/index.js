import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, notification } from "antd";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import Property from "../../classes/Property";
import useUpdateProperty from '../../hooks/useUpdateProperty';
import propertyFields from "../../forms/UPDATE_PROPERTY";
import { SessionContext } from '../../store';


const UpdateProperty = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [fields, setFields] = useState(null);
    const [hiddenFields, setHiddenFields] = useState(null);
    const [resultPutBasic, errorBasic] = useUpdateProperty(fields, hiddenFields);
    const { idProperty } = useParams();
    const history = useHistory();
    const { state } = useContext(SessionContext);
    form.setFieldsValue(data)

    useEffect(() => {
        let getProperty = async () => {
            let { data } = await ApiRequest.get(`/property/${idProperty}`)
            let property = new Property(data).mapResponseToFormJson();
            if (property.ownerId !== state.user.id){
                history.push(`/property/${idProperty}`)
            } else {
                setData(property)
                setHiddenFields({
                    ownerId: property.ownerId,
                    photos: property.photos,
                })
            }
        }
        getProperty();
    }, [idProperty, state.user.id, history])

    useEffect(()=>{
        console.log("already update::", resultPutBasic, errorBasic)
        if (errorBasic) {
            notification.error({
                message: `Error: No se pudo actualizar sus datos`,
                description: `${errorBasic}`,
                placement: "bottomLeft",
            });
        } else if (!!resultPutBasic) {
            // All put success
            notification.success({
                message: `Datos Actualizados`,
                placement: "bottomLeft",
            });
            setTimeout( () => {
                history.push(`/property/${idProperty}`)
            }, 2000)
        }
    },[resultPutBasic, errorBasic, history, idProperty])

    return (
        <ContentWrapper topNav title="Actualizar Propiedad">
            {data && <CustomizedForm form={form} data={propertyFields} onfinish={setFields} />}
        </ContentWrapper>
    )
}

export default UpdateProperty
