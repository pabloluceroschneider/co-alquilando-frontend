import React, { useState } from "react";
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CustomUpload = (props) => {

    /*
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    */



    /*const beforeUpload = file => {
        setFileList([...fileList, file]);
        props.onChange(fileList); {
            if (file.status !== 'uploading') {
                console.log(file);
            }
        }
        console.log(fileList);
    };*/

    const [fileList, setFileList] = useState([]);

    const handlePhoto = (file) => {
        if (file) {
            props.onChange({ file }); {
                if (file.status !== 'uploading') {
                    console.log(file);
                }
            }
        };
    }

    const onRemove = ({ file }) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };


return (
    <Upload onChange={handlePhoto} onRemove={onRemove}>
        <div>
            <Button>
                <UploadOutlined /> Subir
                </Button>

        </div>
    </Upload>
);
};

export default CustomUpload