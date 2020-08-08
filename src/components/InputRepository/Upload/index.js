import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CustomUpload = (props) => {

    const handlePhoto = (file) => {
        if(file) {
            props.onChange({file }); {
                if (file.status !== 'uploading') {
                    console.log(file);
                  }
            }
        }
    }

    return (
        <Upload onChange={handlePhoto} method={NaN}
        
        >
            <div>
                <Button>
                    <UploadOutlined /> Subir
                </Button>

            </div>
        </Upload>
    );
};

export default CustomUpload