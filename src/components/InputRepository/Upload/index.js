import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CustomUpload = () => {
	return (
        <Upload>
            <Button>
                <UploadOutlined /> Subir
            </Button>
        </Upload>
    );
};

export default CustomUpload