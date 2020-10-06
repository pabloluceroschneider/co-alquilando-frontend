import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import CustomizedForm from "../../components/CustomizedForm";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import propertyFields from '../../forms/UPDATE_PROPERTY';

const FormPropertyUpdate = (props) => {
  let { idProperty } = useParams();
  const [form] = Form.useForm();
  const [fields, setFields] = useState(null);
  const history = useHistory();
  const [ownerId, setOwnerId] = useState(null);
  const [status, setStatus] = useState(null);
  const [photosUpdate, setPhotosUpdate] = useState(null);
  useEffect(() => {
    let asyncGetUser = async () => {
      await ApiRequest.get(`/property/${idProperty}`).then((res) => {
        console.log("haciendo el get");

        setOwnerId(res.data.ownerId);
        setStatus(res.data.status);
        setPhotosUpdate(res.data.photos);
        
        let array = [];
        res.data.attributes.forEach((t) => {
          array.push({ [t.attributeType]: t.value });
        });
        //delete  res.data.attributes;
        array.forEach((t) => {
          res.data = {
            ...res.data,
            attributes: { ...res.data.attributes, ...t },
          };
        });
        form.setFieldsValue(res.data);
      });
    };
    asyncGetUser();
  }, [form, idProperty]);

  useEffect(() => {
    if (fields) {
      var atributos = Object.entries(fields.attributes);
      const attributesFormate = atributos.forEach((a) =>
       {
        if (a) {
          let json = {
            attributeType: a[0],
            value: a[1] ? a[1] : "",
            weigth: a[2],
          };
          return json;
        }
      });

      let formatedBody = {
        ...fields,
        attributes: attributesFormate,
        ownerId: ownerId,
        status: status,
      };

      let bodyReq = formatedBody;
      console.log(bodyReq);
      let asyncPut = async () => {
        await ApiRequest.put(`/property/${idProperty}`, bodyReq).then((res) => {
          console.log(res);
          if (res.status === 200) {
            notification.success({
              message: `Datos Actualizados`,
              placement: "bottomLeft",
            });
            history.push(`/property/${idProperty}`);
          } else {
            notification.error({
              message: `Error: No se pudo actualizar sus datos`,
              placement: "bottomLeft",
            });
          }
        });
      };
      asyncPut();
    }
  }, [fields, idProperty, history, ownerId, status]);

  useEffect(() => {
    if (fields && fields.photos) {
      var plist = fields.photos.file.fileList;

      const formData = new FormData();
      formData.append('type', 'file')
      for (const ph in plist) {
        console.log(plist[ph].originFileObj) 
        let phLast = plist[ph].originFileObj
      
        formData.append("photos", phLast)
      }

        let header = {
          'Content-Type': 'multipart/form-data'
        }

        let asyncPutPhoto = async () => {
          await ApiRequest.multipartPut(`/property/${idProperty}/photos`, formData, header).then((res) =>  {
            console.log(res);
            if (res.status === 200) {
              notification.success({
                message: `Datos Actualizados`,
                placement: "bottomLeft",
              });
            } else {
              notification.error({
                message: `Error: No se pudo actualizar sus datos`,
                placement: "bottomLeft",
              });
            }
          });
        };
        asyncPutPhoto();
      }
    
  }, [idProperty, history, fields]);
 
 // Delete photos
 useEffect(() => {
   console.log("EN EL DELETE");
   console.log("fields", fields);
  if (fields && fields.photos) {
    var listPhoto = fields.photos.file.fileList;
    console.log("photosUpdate -->", photosUpdate);
    console.log("listPhoto -->", listPhoto);

    var auxListPhoto = [];
    listPhoto.forEach((photo, index) => {
      if(!photo.originFileObj) {
        auxListPhoto.push(photo);
      }
    });
    console.log("auxListPhoto -->", auxListPhoto);

    auxListPhoto.forEach((photoAux, indexAux) => {
    photosUpdate.forEach((photo, index) => {
      console.log("photoAux -->", photoAux.name);
      console.log("photo -->", photo);

      if (photoAux.name === photo) {
        let asyncPutPhoto = async () => {
          console.log("Photo a eliminar: " , photo)
          await ApiRequest.delete(`/property/${idProperty}/photos/${photo}`).then((res) => {
            console.log(res);
            if (res.status === 200) {
              notification.success({
                message: "Datos Actualizados",
                placement: "bottomLeft",
              });
            } else {
              notification.error({
                message: "Error: No se pudo actualizar sus datos",
                placement: "bottomLeft",
              });
            }
          });
        };
        asyncPutPhoto();
      }
    })
  })
  }
}, [idProperty, history, fields, photosUpdate]);


  return (
    <div>
      <ContentWrapper topNav title="Actualizar Propiedad">
        <CustomizedForm form={form} data={propertyFields} onfinish={setFields} />
      </ContentWrapper>
    </div>
  );
};

export default FormPropertyUpdate;
