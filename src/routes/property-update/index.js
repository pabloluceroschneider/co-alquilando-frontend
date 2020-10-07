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

    // DELETE MULTIPART
    useEffect(() => {
        if (!fields?.photos) return;
        if (!hiddenFields?.photos) return;

        var listPhoto = fields.photos.file?.fileList;
        console.log('listPhoto', listPhoto)
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

        hiddenFields.photos.forEach((photo) => {
            let res = auxListPhoto.find(photoAux => photoAux.name === photo)
                if (!res) {
                    let asyncPutPhoto = async () => {
                        try {
                            console.log("EN EL DELETE");
                            await ApiRequest.delete(`/property/${idProperty}/photos/${photo}`)
                            setResultPut(resultPut => { return { ...resultPut, deleteMultipart: true } });
                        } catch (err) {
                            setError({ from: "Eliminar Fotos", message: err });
                        }
                    }
                    asyncPutPhoto();
                }
            })
        }, [fields, hiddenFields, idProperty])

    // PUT MULTIPART
    useEffect(() => {
        if (!fields?.photos) return;

        let photoAgregar = []
        var plist = fields.photos.file?.fileList;
        plist.forEach((photo) => {
            if (photo.originFileObj) {
                photoAgregar.push(photo);
            }
        });

        console.log('plist', plist)
        if (!photoAgregar.length) {
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
            let property = new Property(data).mapResponseToFormJson();
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
