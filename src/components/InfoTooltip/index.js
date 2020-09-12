import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tooltip, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


const InfoTooltip = ({ color, description, label}) => {
    return (
        <>
                <label className="label" key={label}>{label}
                    <Tooltip placement="right" title={description} color={color}>
                        <InfoCircleOutlined />
                    </Tooltip>
                </label>
                </>
    );
}

export default InfoTooltip;