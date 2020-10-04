import React, { useContext, useState, useEffect } from 'react';
import { Select } from 'antd'
import { notification } from 'antd';
import ApiRequest from '../../../util/ApiRequest';
const { Option } = Select;


const CustomSelect = (props) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        let getData = async () => {
            let { data } = await ApiRequest.get(`${props.endpoint}`);
            setOptions(data);
        }
        getData();
    }, []);

    return (
        <Select>
            {options?.map((op) => {
                return (
                    <Option key={op[props.search]} value={op[props.search]}>
                        {op[props.search]}
                    </Option>
                );
            })}
        </Select>
    );
};

export default CustomSelect