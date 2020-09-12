import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tooltip, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


const InfoTooltip = ({ color, title }) => {
    return (
        <div className="info-tooltip">
            <div>
                <Tooltip title={title} color={color}>
                    <InfoCircleOutlined />
                </Tooltip>
            </div>
        </div>
    );
}

export default InfoTooltip;