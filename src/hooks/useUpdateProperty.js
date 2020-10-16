import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ApiRequest from "../util/ApiRequest";
import Property from "../classes/Property";

const useUpdateProperty = (fields, hiddenFields) => {
    const { idProperty } = useParams();
    const [result, setResult] = useState();
    const [error, setError] = useState()

    useEffect(() => {
        if (!fields || (fields && !fields.length)) return;
        let bodyRequest = new Property(fields).mapJsonToRequest();
        bodyRequest = { ...bodyRequest, ownerId: hiddenFields.ownerId, photos: null };

        let asyncPut = new Promise(async (res, rej) => {
            try {
                const { data } = await ApiRequest.put(`/property/${idProperty}`, bodyRequest);
                res(data);
            } catch (err) {
                setError(err);
                rej(err);
            }
        })

        let asyncPutPhoto = (basic) => { 
            return new Promise(async (res, rej) => {
                if (!fields?.photos) res(true);

                let photoAgregar = []
                var plist = fields.photos.file?.fileList;
                if (plist) {
                    plist.forEach((photo) => {
                        if (photo.originFileObj) {
                            photoAgregar.push(photo);
                        }
                    });
                }
        
                if (!photoAgregar.length) {
                    res(true);
                    return;
                };
        
                const formData = new FormData();
                formData.append('type', 'file')
                for (const ph in photoAgregar) {
                    let phLast = photoAgregar[ph].originFileObj
                    formData.append("photos", phLast)
                }
                try {
                    const { data } = await ApiRequest.multipartPut(`/property/${basic.id}/photos`, formData)
                    res(data);
                } catch (err) {
                    setError(err);
                    rej(err);
                }
            })}

        asyncPut.then( basic => {
            asyncPutPhoto(basic).then( upsert => {
                if (!fields?.photos) {
                    setResult(true)
                    return;
                };

                var auxListPhoto = [];
                var listPhoto = fields.photos.file?.fileList;
                if (!listPhoto) {
                    setResult(true)
                    return;
                };
                listPhoto.forEach((photo) => {
                    if (!photo.originFileObj) {
                        auxListPhoto.push(photo);
                    }
                });
        
                if (!auxListPhoto.length) {
                    setResult(true)
                    return;
                }
        
                hiddenFields.photos.forEach((photo) => {
                    let res = auxListPhoto.find(photoAux => photoAux.name === photo)
                    if (!res) {
                        let asyncPutPhoto = async () => {
                            try {
                                await ApiRequest.delete(`/property/${idProperty}/photos/${photo}`)
                            } catch (err) {
                                setError(err);
                            }
                        }
                        asyncPutPhoto();
                    }
                    if(!error){
                        setResult(true)
                    }
                })
            }).catch( upsert => {
                setError(upsert)
            });
        }).catch( basic => {
            setError(basic)
        });




    }, [fields, idProperty, hiddenFields, error]);

    return [ result, error ]
}

export default useUpdateProperty;