import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { SessionContext } from '../../../store'


const CustomUpload = (props) => {

  const { state } = useContext(SessionContext);

  const [fileList, setFileList] = useState([]);
  let { idProperty } = useParams();

  const handlePhoto = (file) => {
    setFileList(file.fileList);

    if (file) {
      props.onChange({ file });
      if (file.status !== "uploading") {
      }
    }
  };

  useEffect(() => {
    let asyncGet = async () => {
      if (!fileList.length && props && props.value) {
        if (String(props.id) === "property_photos" && props.value) {
          if (props.value) {
            props.value.forEach(async (photo, index) => {
              let photoJson = {
                uid: index,
                name: photo,
                url: `http://localhost:8080/property/${idProperty}/photos/${photo}`,
              };
              setFileList((fileList) => [...fileList, photoJson]);
            });
          }
        } else {

          if (String(props.id) === "user_photos" && props.value) {
            if (Array.isArray(props.value)) {
              props.value.forEach(async (photo, index) => {
                let photoJson = {
                  uid: index,
                  name: photo,
                  url: `http://localhost:8080/user/${state.user.id}/photos/${photo}`,
                };
                setFileList((fileList) => [...fileList, photoJson]);
              });
            }
          }
        }
      }
    };
    asyncGet();
  }, [state, props, fileList, idProperty]);



  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onRemove = ({ file }) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };


  return (
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={handlePhoto}
        onPreview={onPreview}
        onRemove={onRemove}
      >
        {
          String(props.id) === "property_photos" ?
            fileList.length < 8 && "+ Upload" :
            fileList.length < 1 && "+ Upload"
        }
      </Upload>
    </ImgCrop>
  );
};

export default CustomUpload;
