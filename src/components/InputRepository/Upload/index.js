import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CustomUpload = (props) => {

    const handlePhoto = (value) => {
        if(value) {
            props.onChange(value.file)
        }
    }

    return (
        <Upload onChange={handlePhoto}
        
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