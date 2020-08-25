import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const CustomUpload = (props) => {
  const [fileList, setFileList] = useState([]);
  let { idProperty } = useParams();

  const handlePhoto = (file) => {
    console.log("DATOS:" + props.value);
    setFileList(file.fileList);

    if (file) {
      props.onChange({ file });
      if (file.status !== "uploading") {
        console.log("File:", file);
      }
    }
  };

  useEffect(() => {
    let asyncGet = async () => {
      console.log('Use Effect');
      if (props.value && !fileList.length) {
        console.log("props value -->", props.value);
        console.log("File list -->", fileList);
        props.value.forEach(async (photo, index) => {
          let photoJson = {
            uid: index,
            name: photo,
            url: `http://localhost:8080/property/${idProperty}/photos/${photo}`,
          };
          setFileList((fileList) => [...fileList, photoJson]);
        });
      }
    };
    asyncGet();
  }, [props.value, fileList, idProperty ]);

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

  // Bloque Comentado porque no se está Utilizando
  // TODO: Analizar si es necesario
  // const action = (file) => {
  //   const f = file;
  //   console.log("ACTION:");
  //   const actualFiles = props.value;
  //   let src;
  //   if (actualFiles) {
  //     actualFiles.forEach((element) => {
  //       let asyncGetUser = async () => {
  //         src = await ApiRequest.get(
  //           `/property/5f1c584b07f2c81aa45c12c5/${element}`
  //         );
  //       };
  //       asyncGetUser();
  //     });
  //   } else {
  //     src = "https://www.mocky.io/v2/5cc8019d300000980a055e76";
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

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
        {fileList.length < 5 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default CustomUpload;
