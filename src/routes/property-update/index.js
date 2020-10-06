import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, notification } from "antd";
import ApiRequest from "../../util/ApiRequest";
import Property from "../../classes/Property";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import propertyFields from "../../forms/UPDATE_PROPERTY";

// custom hook
const usePutProperty = (fields, hiddenFields) => {
    const { idProperty } = useParams();
    const [resultPut, setResultPut] = useState({ basic: null, multipart: null, deleteMultipart: null });
    const [error, setError] = useState({ from: null, message: null });

    // PUT BASIC DATA
    useEffect(() => {
        if (!fields) return;
        let bodyRequest = new Property(fields).mapJsonToRequest();
        bodyRequest = { ...bodyRequest, ...hiddenFields };

        let asyncPut = async () => {
            try {
                await ApiRequest.put(`/property/${idProperty}`, bodyRequest);
                setResultPut(resultPut => { return { ...resultPut, basic: true } });
            } catch (err) {
                setError({ from: "Actualizar Datos", message: err });

            }
        }
        asyncPut();
    }, [fields, idProperty, hiddenFields]);

    // PUT MULTIPART
    useEffect(() => {
        if (!fields?.photos) return;

        var plist = fields.photos.file?.fileList;
        if (!plist) {
            setResultPut(resultPut => { return { ...resultPut, multipart: true } });
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
                setResultPut(resultPut => { return { ...resultPut, multipart: true } });
            } catch (err) {
                setError({ from: "Actualizar Fotos", message: err });
            }
        }
        asyncPutPhoto();
    }, [fields, hiddenFields, idProperty])

    // DELETE MULTIPART
    useEffect(() => {
        if (!fields?.photos) return;
        if (!hiddenFields?.photos) return;

        var listPhoto = fields.photos.file?.fileList;
        if (!listPhoto) {
            setResultPut(resultPut => { return { ...resultPut, deleteMultipart: true } });
            return
        }
        var auxListPhoto = [];
        listPhoto.forEach((photo) => {
            if (!photo.originFileObj) {
                auxListPhoto.push(photo);
            }
        });
        console.log("auxListPhoto  --> ", auxListPhoto);
        console.log("hiddenFields  --> ", hiddenFields);
        auxListPhoto.forEach((photoAux) => {
            hiddenFields.photos.forEach((photo) => {
                console.log("photoAux.name  --> ", photoAux.name);
                console.log("photo  --> ", photo);
                if (photoAux.url === photo) {
                    let asyncPutPhoto = async () => {
                        try {
                            console.log("EN EL DELETE");
                            await ApiRequest.delete(`${photo}`)
                            setResultPut(resultPut => { return { ...resultPut, deleteMultipart: true } });
                        } catch (err) {
                            setError({ from: "Eliminar Fotos", message: err });
                        }
                    }
                    asyncPutPhoto();
                }
            })
        })
    }, [fields, hiddenFields, idProperty])

    return [resultPut, error]
}

const UpdateProperty = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [fields, setFields] = useState(null);
    const [hiddenFields, setHiddenFields] = useState(null);
    const [resultPut, error] = usePutProperty(fields, hiddenFields);
    const { idProperty } = useParams();
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
    }, [idProperty])

    useEffect(() => {
        if (error.message) {
            notification.error({
                message: `Error: No se pudo actualizar sus datos`,
                description: `${error.from}`,
                placement: "bottomLeft",
            });
        } else if (resultPut.basic && resultPut.multipart && resultPut.deleteMultipart) {
            // All put success
            notification.success({
                message: `Datos Actualizados`,
                placement: "bottomLeft",
            });
            history.push(`/property/${idProperty}`);
        }
    }, [resultPut, error, history, idProperty])

    return (
        <ContentWrapper topNav title="Actualizar Propiedad">
            <CustomizedForm form={form} data={propertyFields} onfinish={setFields} />
        </ContentWrapper>
    )
}

export default UpdateProperty
