import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, notification } from "antd";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import Property from "../../classes/Property";
import propertyFields from "../../forms/UPDATE_PROPERTY";
import { SessionContext } from '../../store';


const UpdateProperty = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(null);
    const [hiddenFields, setHiddenFields] = useState(null);
    const { idProperty } = useParams();
    const history = useHistory();
    const { state } = useContext(SessionContext);
    form.setFieldsValue(data)

    const updateProperty = async (values) => {
        let bodyRequest = new Property(values).mapJsonToRequest();
        bodyRequest = { ...bodyRequest, ownerId: hiddenFields.ownerId, photos: null };
        await ApiRequest.put(`/property/${idProperty}`, bodyRequest).then( async () => {
            let deletePhotos = new Promise((res,rej)=>{
                hiddenFields.photos.forEach( async (photo) => {
                    let res = values.photos.file.fileList.find( photoAux => photoAux.name === photo)
                    if (!res) {
                        await ApiRequest.delete(`/property/${idProperty}/photos/${photo}`)
                    }
                })
                res()
            })
            deletePhotos.then( async () => {
                let postPhotos = false;
                const formData = new FormData();
                formData.append('type', 'file')
                await values.photos.file.fileList.map( async pic => {
                    if ( !hiddenFields.photos.includes(pic.name) ){
                        postPhotos = true;
                        formData.append("photos", pic.originFileObj)
                    }
                })
                if(postPhotos){
                    await ApiRequest.multipartPut(`/property/${idProperty}/photos`, formData).then( () => {
                        hiddenFields.photos.forEach( async (photo) => {
                            let res = values.photos.file.fileList.find( photoAux => photoAux.name === photo)
                            if (!res) {
                                setTimeout( async ()=>{
                                    await ApiRequest.delete(`/property/${idProperty}/photos/${photo}`)
                                }, 250)
                            }
                        })    
                    }).then( () => {
                        hiddenFields.photos.forEach( async (photo) => {
                            let res = values.photos.file.fileList.find( photoAux => photoAux.name === photo)
                            if (!res) {
                                setTimeout( async ()=>{
                                    await ApiRequest.delete(`/property/${idProperty}/photos/${photo}`)
                                }, 250)
                            }
                        })    
                    })
                }
            })
        })
    }

    useEffect(() => {
        let getProperty = async () => {
            let { data } = await ApiRequest.get(`/property/${idProperty}`)
            let property = new Property(data).mapResponseToFormJson();
            if (property.ownerId !== state.user.id) {
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

    const onDelete = async () => {
        await ApiRequest.delete(`/property/${idProperty}`).then(res => {
            notification.success({
                message: `Propiedad eliminada con éxito`,
                placement: "bottomLeft",
            });
            history.push(`/my-properties`)
        })

    };

    return (
        <div>
            <ContentWrapper topNav title="Actualizar Propiedad">
                <CustomizedForm form={form} data={propertyFields} onfinish={updateProperty} onDelete={onDelete} />
            </ContentWrapper>
        </div>
    );
};

export default UpdateProperty
